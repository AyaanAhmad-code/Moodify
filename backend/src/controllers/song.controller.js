import songModel from "../models/song.model.js"; // Add the .js extension!
import id3 from "node-id3";

// Because we made uploadFile a "Named Export" in the storage service earlier, 
// using "import * as" grabs everything from that file and bundles it into a single storageService object.
import * as storageService from "../services/storage.service.js"; 

async function uploadSong(req, res) {
  const songBuffer = req.file.buffer;
  const { mood } = req.body;

  const tags = id3.read(songBuffer);

  // Both the song and the poster upload concurrently, cutting the wait time in half!
  const [songFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "/cohort-2/moodify/songs",
    }),
    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpeg",
      folder: "/cohort-2/moodify/posters",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });

  res.status(201).json({
    message: "Song Created Successfully",
    song,
  });
}

async function getSong(req, res) {
    const { mood } = req.query;

    try {
        const songs = await songModel.find({ mood }); 

        res.status(200).json({
            message: "songs fetched successfully",
            songs
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching songs", error });
    }
}

// Exporting as a single default object so your song.routes.js works perfectly
export default { uploadSong, getSong };