/**
 * Formate les messages utilisateurs et de l'ia
 *
 * @param {Array} messages
 * @returns {Array} - Retourne les messages formatés.
 */
export default function messageMapper(messages) {
    const messagesFormat = messages.map((msg) => {
        return {
            role: msg.role,
            content: msg.prompt,
        };
    });
    return messagesFormat;
}
