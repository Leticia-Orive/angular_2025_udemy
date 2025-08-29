interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
    }

    interface Details {
        author: string;
        year: number;
    }

    const audioPlayer: AudioPlayer = {
        audioVolume: 90,
        songDuration: 36,
        song: "Mess",
        details:{
            author: "Ed Sheeran",
            year: 2014
        }
    }
    const song = 'New Song';
//Destructuracion
//const {} = audioPlayer;
//la voy a renombrar
const { song: anotherSong, songDuration: duration,details
    /*destructuro el autor
    details: { author},*/ 
} = audioPlayer;
//destructuracion de los details > author, year
const { author } = details;

console.log('Song: ', anotherSong);
console.log('Author: ', author);
console.log('Duration: ', duration);
export {};