import { SlashCommandBuilder } from 'discord.js';
import { useMainPlayer } from 'discord-player';

export default {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Reanuda la reproducción de la canción pausada'),

  async execute(interaction) {
    const player = useMainPlayer();
    const queue = player.nodes.get(interaction.guildId);

    if (!queue || queue.isPlaying()) {
      return interaction.reply({ content: 'No hay ninguna canción pausada.', ephemeral: true });
    }

    queue.node.resume();
    interaction.reply({ content: '▶️ Canción reanudada.' });
  }
};
