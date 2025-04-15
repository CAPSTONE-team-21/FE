export function createChatBlocksFrom(messages) {
  const chatBlocks = [];
  let i = 0;

  while (i < messages.length) {
    const current = messages[i];

    if (current.sender === 'USER') {
      const userMsg = current;
      const botMessages = [];

      let j = i + 1;
      while (j < messages.length && messages[j].sender === 'BOT') {
        botMessages.push(messages[j]);
        j++;
      }

      chatBlocks.push({
        userMessage: userMsg,
        botMessages,
      });

      i = j; // 다음 USER부터 다시 시작
    } else {
      i++;
    }
  }

  return chatBlocks;
}
