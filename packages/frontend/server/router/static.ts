import {Router, static as staticRoute} from 'express';
import cfg from '../../lib/cfg';

export const staticRoutes = (router: Router) => {
    router
        .use('/', staticRoute(cfg.static.staticDir))
        .use('/static', staticRoute(cfg.static.dir));
};
