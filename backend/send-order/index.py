import os
import json
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта и отправляет уведомление в Telegram"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    contact = body.get('contact', '').strip()
    star = body.get('star', '').strip()
    occasion = body.get('occasion', '').strip()
    recipient = body.get('recipient', '').strip()
    message_text = body.get('message', '').strip()

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите имя и контакт'})
        }

    lines = [
        '⭐ <b>Новая заявка на поздравление!</b>',
        '',
        f'👤 <b>Заказчик:</b> {name}',
        f'📲 <b>Контакт:</b> {contact}',
    ]
    if star:
        lines.append(f'🎤 <b>Звезда:</b> {star}')
    if recipient:
        lines.append(f'🎁 <b>Получатель:</b> {recipient}')
    if occasion:
        lines.append(f'🎉 <b>Повод:</b> {occasion}')
    if message_text:
        lines.append(f'💬 <b>Пожелания:</b> {message_text}')

    tg_text = '\n'.join(lines)

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    tg_url = f'https://api.telegram.org/bot{token}/sendMessage'
    tg_data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': tg_text,
        'parse_mode': 'HTML'
    }).encode()

    req = urllib.request.Request(tg_url, data=tg_data, method='POST')
    with urllib.request.urlopen(req) as resp:
        resp.read()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
