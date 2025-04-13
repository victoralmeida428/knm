import { PrismaClient } from '../../generated/prisma';
import {config} from "dotenv";

config();

declare global {
    // eslint-disable-next-line vars-on-top, no-var
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL // || "postgres://knm_admin:knm_senha@db:5432/knm" // Já validamos que existe
        }
    }
});

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

export default prisma;