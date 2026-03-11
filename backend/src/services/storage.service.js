import ImageKit from "@imagekit/nodejs";

const Client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

export async function uploadFile({ buffer, filename, folder = "" }) {
    const file = await Client.files.upload({
        file: await ImageKit.toFile(Buffer.from(buffer)),
        fileName: filename,
        folder
    });

    return file;
}