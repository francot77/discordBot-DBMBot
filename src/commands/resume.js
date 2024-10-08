import { SlashCommandBuilder } from 'discord.js';
import { useMainPlayer } from 'discord-player';

export default {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Reanuda la reproducción de la canción pausada'),

  async execute(interaction) {
    const player = useMainPlayer();
    const queue = player.nodes.get(interaction.guildId);
    await interaction.deferReply()

    if (!queue || queue.node.isPlaying()) {
      return interaction.editReply({ content: 'No hay ninguna canción pausada.', ephemeral: true });
    }

    queue.node.resume();
    interaction.editReply({ content: '▶️ Canción reanudada.' });
  }
};
