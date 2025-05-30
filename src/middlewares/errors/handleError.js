// Ce fichier contient une fonction utilitaire pour gérer les erreurs dans ton application Express de manière centralisée et cohérente.


const handleError = (res, error, message, statusCode ) => {
  //     res : l’objet réponse Express (response) pour envoyer une réponse HTTP au client.
  // error : l’objet erreur capturé (souvent dans un catch).
  // message : le message personnalisé à envoyer au client (ex : "Erreur lors de l’opération").


    console.error(error);
    // Affiche l’erreur complète dans la console du serveur pour que les développeurs puissent la diagnostiquer


    // Renvoyer une réponse JSON au client avec le code d'état et le message spécifiés
    return res.status(statusCode).json({ message });
  //  envoie une réponse JSON au client :
  // avec le code HTTP défini,
  // et un message d’erreur sous la forme { message: "..." }

};

export default handleError