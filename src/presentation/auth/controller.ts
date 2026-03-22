import { Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { CreateUserDto, CreateUserServ, CustomError, GetUserDto, GetUserServ, LoginUserDto, LoginUserServ, RefreshTokenRepository, UpdatePasswordDto, UpdatePasswordServ, UserEntity, UserRepository } from '../../domain';
import { JwtAdapter, envs } from '../../config';

export class AuthController {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly refreshTokenRepository: RefreshTokenRepository,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };

    private sanitizeUser = (user: UserEntity) => {
        const { password, ...rest } = user as unknown as Record<string, any>;
        return rest;
    }

    private setRefreshCookie = (res: Response, refreshToken: string, expiresAt: Date) => {
        const secure = process.env.NODE_ENV === 'production';
        res.cookie(envs.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
            httpOnly: true,
            secure,
            sameSite: secure ? 'none' : 'lax',
            path: '/eco/auth/refresh',
            maxAge: Math.max(expiresAt.getTime() - Date.now(), 0),
        });
    }

    private async issueSession(res: Response, req: Request, user: UserEntity) {
        const accessToken = await JwtAdapter.generateAccessToken({ id: user.id, role: user.role });
        const refreshToken = await JwtAdapter.generateRefreshToken({ id: user.id, role: user.role });

        if (!accessToken || !refreshToken) {
            throw CustomError.internalServer('Error generating tokens');
        }

        const decoded = jwt.decode(refreshToken) as { exp?: number } | null;
        const expiresAt = decoded?.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await this.refreshTokenRepository.create({
            userId: user.id,
            token: refreshToken,
            expiresAt,
            userAgent: req.headers['user-agent'] as string,
            ip: req.ip,
        });

        this.setRefreshCookie(res, refreshToken, expiresAt);

        return {
            user: this.sanitizeUser(user),
            accessToken,
        };
    }

    getUserById: RequestHandler = async (req, res) => {

        const userId = req.params.id;
        const [error, getUserDto] = GetUserDto.getUserDto({ userId });
        if (error) {
            res.status(400).json({ error });
            return;
        }

        try {
            const user = await new GetUserServ(this.userRepository).execute(getUserDto!.userId);
            res.json(this.sanitizeUser(user));
        } catch (err) {
            this.handleError(err, res);
        }
    }

    loginUser: RequestHandler = async (req, res) => {
        const [error, loginUserDto] = LoginUserDto.loginUser(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }

        try {
            const user = await new LoginUserServ(this.userRepository).execute(loginUserDto!);
            const session = await this.issueSession(res, req, user);
            res.json(session);
        } catch (err) {
            this.handleError(err, res);
        }
    }

    createUser: RequestHandler = async (req, res) => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }

        try {
            const user = await new CreateUserServ(this.userRepository).execute(createUserDto!);
            const session = await this.issueSession(res, req, user);
            res.json(session);
        } catch (err) {
            this.handleError(err, res);
        }

    }

    refreshToken: RequestHandler = async (req, res) => {
        try {
            const incoming = (req.cookies?.[envs.REFRESH_TOKEN_COOKIE_NAME]) || req.body?.refreshToken;
            if (!incoming) {
                res.status(401).json({ error: 'Refresh token requerido' });
                return;
            }

            const payload = await JwtAdapter.validateRefreshToken<{ id: string, role: string }>(incoming);
            if (!payload) {
                res.status(401).json({ error: 'Refresh token inválido' });
                return;
            }

            const stored = await this.refreshTokenRepository.findValid(incoming, payload.id);
            if (!stored) {
                res.status(401).json({ error: 'Refresh token revocado o expirado' });
                return;
            }

            await this.refreshTokenRepository.revoke(incoming, payload.id);

            const user = await this.userRepository.getUserById(payload.id);
            const session = await this.issueSession(res, req, user);
            res.json(session);
        } catch (err) {
            this.handleError(err, res);
        }
    }

    logout: RequestHandler = async (req, res) => {
        const incoming = (req.cookies?.[envs.REFRESH_TOKEN_COOKIE_NAME]) || req.body?.refreshToken;

        if (incoming) {
            try {
                const payload = await JwtAdapter.validateRefreshToken<{ id: string }>(incoming);
                if (payload) await this.refreshTokenRepository.revoke(incoming, payload.id);
            } catch {
                // Ignore errors on logout
            }
        }

        const secure = process.env.NODE_ENV === 'production';
        res.clearCookie(envs.REFRESH_TOKEN_COOKIE_NAME, { path: '/eco/auth/refresh', httpOnly: true, sameSite: secure ? 'none' : 'lax', secure });
        res.status(204).send();
    }

    updatePassword: RequestHandler = async (req, res) => {
        const [error, updatePasswordDto] = UpdatePasswordDto.updatePassword({
            ...req.body,
            user: req.body.user.id,
        });

        if (error) {
            res.status(400).json({ error });
            return;
        }
        const { user, newPassword } = updatePasswordDto!;

        try {
            const updated = await new UpdatePasswordServ(this.userRepository).execute(user, newPassword);
            res.json(this.sanitizeUser(updated));
        } catch (err) {
            this.handleError(err, res);
        }
    }
}
