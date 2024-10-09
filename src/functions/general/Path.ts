import fs from "fs";
import path from "path";

export function deleteFolderRecursive(directoryPath:string) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file) => {
            const curPath = path.join(directoryPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // Recursivamente chama a função se for um diretório
                deleteFolderRecursive(curPath);
            } else {
                // Remove o arquivo
                fs.unlinkSync(curPath);
            }
        });
        // Remove o diretório atual
        fs.rmdirSync(directoryPath);
    }
}
