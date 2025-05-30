import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required - / Le nom est requis
        trim: true, // Empty fields at the beginning of the string - Champs vides au début de la chaîne
        unique: true,
        minlength: 1, // At least 1 character - Au moins 1 caractère
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
    },
    picture: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    },
    isAdmin: {    
        // utilisé pour définir la structure d’un document dans une base de données. 
        //  indiquer si un utilisateur (ou autre entité) est administrateur ou non.
        type: Boolean,
        default: false
    }
});

// Create and export the model - / Créer et exporter le modèle   
export default mongoose.model("Example", exampleSchema);

