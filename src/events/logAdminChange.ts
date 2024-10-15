import {EventEmitter} from "node:events"
import {JwtUser, UserToken} from "../types/Global";
import Console from "../functions/general/Console";
import pgClient from "../database/postgres";
export class LoggerAdminEmitter<TEvents extends Record<string, any>> {
    private emitter = new EventEmitter()

    emit<TEventName extends keyof TEvents & string>(
        eventName: TEventName,
        ...eventArg: TEvents[TEventName]
    ) {
        this.emitter.emit(eventName, ...(eventArg as []))
    }

    on<TEventName extends keyof TEvents & string>(
        eventName: TEventName,
        handler: (...eventArg: TEvents[TEventName]) => void
    ) {
        this.emitter.on(eventName, handler as any)
    }

    off<TEventName extends keyof TEvents & string>(
        eventName: TEventName,
        handler: (...eventArg: TEvents[TEventName]) => void
    ) {
        this.emitter.off(eventName, handler as any)
    }
}
export type AdminLoggerEmitterType = {
    'anime-change':[string,UserToken],
    'img-change':[string,UserToken],
}

export const eventLoggerAdmin = new LoggerAdminEmitter<AdminLoggerEmitterType>()

eventLoggerAdmin.on("anime-change",async (e,user)=>{
    try{
        console.log('User ID:', user._id);
        console.log('Event:', e);
        console.log('Session ID:', user.session_id);

        // Verifica se os valores estão válidos
        if (!user._id || !user.session_id || !e) {
            console.error('Erro: Valores inválidos para o INSERT');
            return;
        }

        // Tenta fazer o INSERT
        const result = await pgClient.query(
            "INSERT INTO users.user_admin_log (user_id, command, session_id) VALUES ($1, $2, $3) RETURNING *",
            [user._id, e, user.session_id]
        );
        await pgClient.query("COMMIT")

        console.log('INSERT executado com sucesso:', result);
    }catch(err){
        Console.error(err)
        throw err
    }
})
