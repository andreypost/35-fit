import { SetMetadata } from '@nestjs/common';

// this logic throws exceptions for AuthGuard
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
