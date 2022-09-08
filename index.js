/**
  * Edit features in './message/msg.js'
  * Contact me on WhatsApp wa.me/6285791458996
  * Follow https://github.com/rtwone
  * If you want to buy an updated script that is not encrypted, please WhatsApp me
*/

"use strict";
const {
	default: makeWASocket,
        BufferJSON,
        initInMemoryKeyStore,
        DisconnectReason,
        AnyMessageContent,
        useSingleFileAuthState,
        makeInMemoryStore,
        delay,
        downloadContentFromMessage,
        jidDecode,
        generateForwardMessageContent,
        generateWAMessageFromContent,
        proto,
        prepareWAMessageMedia
} = require("@adiwajshing/baileys")
const figlet = require("figlet");
const fs = require("fs");
const moment = require('moment')
const chalk = require('chalk')
const logg = require('pino')
const clui = require('clui')
const { Spinner } = clui
const { serialize, getBuffer } = require("./lib/myfunc");
const { color, mylog, infolog } = require("./lib/color");
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')
let setting = JSON.parse(fs.readFileSync('./config.json'));
let session = `./${setting.sessionName}.json`
const { state, saveState } = useSingleFileAuthState(session)
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));

function title() {
      console.clear()
	  console.log(chalk.bold.green(figlet.textSync('Kurumi Tokisaki-Md', {
		font: 'Standard',
		horizontalLayout: 'default',
		verticalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	})))
	console.log(chalk.yellow(`\n                        ${chalk.yellow('[ Created By Satganz Devs ]')}\n\n${chalk.red('Satganz Devs')} : ${chalk.white('WhatsApp Bot Multi Device')}\n${chalk.red('Subs Channel Devs')} : ${chalk.white('SatganzDevs')}\n${chalk.red('Message Me On WhatsApp')} : ${chalk.white('6281316701742')}\n${chalk.red('Donate')} : ${chalk.white('6282398383300 ( Gopay )')}\n`))
}

/**
* Uncache if there is file change;
* @param {string} module Module name or path;
* @param {function} cb <optional> ;
*/
function nocache(module, cb = () => { }) {
	console.log(`Module ${module} sedang diperhatikan terhadap perubahan`) 
	fs.watchFile(require.resolve(module), async () => {
		await uncache(require.resolve(module))
		cb(module)
	})
}
/**
* Uncache a module
* @param {string} module Module name or path;
*/
function uncache(module = '.') {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(module)]
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}

const status = new Spinner(chalk.cyan(` Booting WhatsApp Bot`))
const starting = new Spinner(chalk.cyan(` Preparing After Connect`))
const reconnect = new Spinner(chalk.redBright(` Reconnecting WhatsApp Bot`))

const store = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })

const connectToWhatsApp = async () => {
	const conn = makeWASocket({
            printQRInTerminal: true,
            logger: logg({ level: 'fatal' }),
            auth: state,
            browser: ["Satganz Devs", "Safari", "1.0.0"]
        })
	title()
        store.bind(conn.ev)
	
	/* Auto Update */
	require('./message/help')
	require('./lib/myfunc')
	require('./message/msg')
	nocache('./message/help', module => console.log(chalk.greenBright('[ SATGANZDEVS ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./lib/myfunc', module => console.log(chalk.greenBright('[ SATGANZDEVS ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./message/msg', module => console.log(chalk.greenBright('[ SATGANZDEVS ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	
	conn.multi = true
	conn.nopref = false
	conn.prefa = ''
	conn.ev.on('messages.upsert', async m => {
		if (!m.messages) return;
		var msg = m.messages[0]
		msg = serialize(conn, msg)
		msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
		require('./message/msg')(conn, msg, m, setting, store, welcome)
	})
	conn.ev.on('connection.update', (update) => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			status.stop()
			reconnect.stop()
			starting.stop()
			console.log(mylog('Server Ready ✓'))
			lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut 
			? connectToWhatsApp()
			: console.log(mylog('Wa web terlogout...'))
		}
	})
	conn.ev.on('creds.update', () => saveState)
	
        conn.ev.on('group-participants.update', async (data) => {
          const isWelcome = welcome.includes(data.id) ? true : false
          if (isWelcome) {
            try {
              for (let i of data.participants) {
                try {
                  var pp_user = await conn.profilePictureUrl(i, 'image')
                } catch {
                  var pp_user = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }
                if (data.action == "add") {
                  conn.sendMessage(data.id, { image: { url: pp_user }, caption: `Welcome @${i.split("@")[0]}`, mentions: [i] })
                } else if (data.action == "remove") {
                  conn.sendMessage(data.id, { image: { url: pp_user }, caption: `Sayonara @${i.split("@")[0]}`, mentions: [i] })
                }
              }
            } catch (e) {
              console.log(e)
            }
          }
        })

	conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })
    // Set Bio
      conn.setStatus = (status) => {
        conn.query({
            tag: 'iq',
            attrs: {
                to: '@s.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [{
                tag: 'status',
                attrs: {},
                content: Buffer.from(status, 'utf-8')
            }]
        })
        return status
    }
    
    conn.downloadAndSaveMediaMessage = async(msg, type_file, path_file) => {
           if (type_file === 'image') {
             var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
             let buffer = Buffer.from([])
             for await(const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
             }
             fs.writeFileSync(path_file, buffer)
             return path_file
           } else if (type_file === 'video') {
             var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
             let buffer = Buffer.from([])
             for await(const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
             }
             fs.writeFileSync(path_file, buffer)
             return path_file
           } else if (type_file === 'sticker') {
             var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
             let buffer = Buffer.from([])
             for await(const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
             }
             fs.writeFileSync(path_file, buffer)
             return path_file
           } else if (type_file === 'audio') {
             var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
             let buffer = Buffer.from([])
             for await(const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
             }
             fs.writeFileSync(path_file, buffer)
             return path_file
           }
        }
        
        // Resize
       conn.reSize = async (image, width, height) => {
       let jimp = require('jimp')
       var oyy = await jimp.read(image);
       var kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
       return kiyomasa
      }
      
      // Send 5 Button Location
      conn.send5ButLoc = async (jid , text = '' , footer = '', lok, but = [], options = {}) =>{
       let resize = await conn.reSize(lok, 300, 150)
       var template = generateWAMessageFromContent(jid, {
       "templateMessage": {
       "hydratedTemplate": {
       "locationMessage": {
       "degreesLatitude": 0,
       "degreesLongitude": 0,
       "jpegThumbnail": resize,
       "thumbnailUrl": setting.group
       },
       "hydratedContentText": text,
       "hydratedFooterText": footer,
       "hydratedButtons": but
       }
       }
       }, options)
       conn.relayMessage(jid, template.message, { messageId: template.key.id })
      }

	return conn
}

connectToWhatsApp()
.catch(err => console.log(err))
