import { getUserData } from "../api/util.js";

export function addSession(ctx,next){
    ctx.user = getUserData();
    next();
}