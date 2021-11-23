import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const post = await prisma.post.create({
        data: {
            title: 'My first title post',
            body: 'My first body post',
            categoria: 'Tecnologia',
            organizador: {
                connect: {
                    id: '619ce1403984ad5feb9a8c27'
                }
            }
        }
    });
    console.log(post);
}

main();