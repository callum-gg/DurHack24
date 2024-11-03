const webhook_url = 'c7c56dcb-e3b4-4f60-81a9-9c121cf7606d'
let user, conv

async function CreateUser() {
    let response = await fetch(`https://chat.botpress.cloud/${webhook_url}/users`, {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json'},
        body: JSON.stringify({})
    });
    user = await response.json();
}

async function CreateConversation() {
    let response = await fetch(`https://chat.botpress.cloud/${webhook_url}/conversations`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'x-user-key': user.key,
            'content-type': 'application/json'
        },
        body: JSON.stringify({})
    });
    conv = await response.json();
}

async function SendMessage(content) {
    if (!user) {await CreateUser()}
    if (!conv) {await CreateConversation()}

    let response = await fetch(`https://chat.botpress.cloud/${webhook_url}/messages`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'x-user-key': user.key,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            conversationId: conv.conversation.id,
            payload: {
                type: 'text',
                text: content
            }
        })
    });
    let msg = await response.json();

    let bot_response = false;
    while (!bot_response) {
        await new Promise(resolve => setTimeout(resolve, 500));
        let messages = await fetch(`https://chat.botpress.cloud/${webhook_url}/conversations/${conv.conversation.id}/messages`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-user-key': user.key,
            }
        });
        messages = await messages.json();
        if (messages.messages[0].id !== msg.message.id) {
            switch (messages.messages[0].payload.type) {
                case 'text':
                    bot_response = messages.messages[0].payload.text
                    break;
                case 'choice':
                    bot_response = '';
                    for (let i=0; i<messages.messages[0].payload.options.length; i++) {
                        bot_response += `${i+1}. ${messages.messages[0].payload.options[i].label}\n`;
                    }
                    break;
                case 'carousel':
                    bot_response = '';
                    for (let i=0; i<messages.messages[0].payload.actions.length; i++) {
                        bot_response += `${i+1}. ${messages.messages[0].payload.actions[i].label}\n`;
                    }
                    break;
                default:
                    bot_response = 'Sorry, I couldn\'t help with that request';
            }
        }
    }
    return bot_response;
}

module.exports = {
    SendMessage
}