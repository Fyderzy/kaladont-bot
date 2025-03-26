import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dictionaryPath = path.resolve(__dirname, '../server/data/serbian-dictionary-mega.json');

// Nove srpske reči za dodati - slovo T i U
const additionalWords = [
  // T
  "tabakera", "tabakerka", "tabačina", "tabak", "tabak", "taban", "tabana", "tabaška", "tabašnica", "tabela", 
  "taberana", "tabernakulski", "tabernakulom", "tablica", "tableta", "tablete", "tabličar", "tablica", "tabletiranje", "tabletiran", 
  "tabloid", "tabloidno", "tabloidni", "tabor", "taborište", "tabornik", "taborski", "taborovanje", "taborovati", "tabu", 
  "tabui", "tabulator", "tacanje", "tacati", "tacilac", "taciskač", "tacisko", "tacknuta", "tacna", "tačka", 
  "tačkaš", "tačnost", "tačno", "tačan", "tajanstven", "tajanstveno", "tajanstvenost", "tajac", "tajeći", "tajetak", 
  "tajiti", "tajenje", "tajga", "tajfun", "tajga", "tajinstveno", "tajinstvo", "tajistveno", "tajiti", "tajkunski", 
  "tajkun", "tajlandski", "tajlov", "tajm", "tajmeri", "tajmout", "tajmsovski", "tajmsija", "tajmsov", "tajmsški", 
  "tajmsški", "tajmus", "tajna", "tajni", "tajnije", "tajnik", "tajnikom", "tajno", "tajnopis", "tajnost", 
  "tajnovitost", "tajnovit", "tajnopisati", "tajnopisno", "tajnopisje", "tajnopisac", "tajnopisan", "tajnovanje", "tajnovito", "tajstvo", 
  "takav", "takav", "takmicar", "takmičar", "takmičarski", "takmičenje", "takmičiti", "takmac", "taknuti", "tako", 
  "takoder", "takođe", "takodjeli", "također", "takoreći", "takorečeno", "taksametar", "taksi", "taksist", "taksacija", 
  "taksativ", "taksativno", "taksator", "taksativan", "taksativnost", "takseni", "taksirati", "taksimetarist", "taktika", "taktički", 
  "takt", "takticizam", "taktički", "taktik", "taktički", "taktilnost", "taktilan", "taktilni", "taktilitet", "taktičnost", 
  "taktični", "taktiranje", "taktiziranje", "takvi", "talasast", "talasanje", "talasati", "talasanje", "talasno", "talenat", 
  "talent", "talentiran", "talentovanost", "talijanski", "talij", "talijan", "talijanski", "talionski", "talisman", "taljivost", 
  "talog", "taloženje", "taložiti", "taljenje", "taljig", "taljika", "taljine", "tamjan", "tamničar", "tamnica", 
  "tamo", "tamnoća", "tamni", "tamnina", "tamnoputi", "tamnost", "tamnovanje", "tamnovati", "tamnjan", "tamnoća", 
  "tamnolik", "tamnoput", "tamnjeći", "tamniti", "tamnjeti", "tanac", "tanačak", "tanana", "tandrčak", "tandrkanje", 
  "tandrkati", "tandrljanje", "tangens", "tangenta", "tangencijalan", "tangencijalni", "tangentni", "tangibili", "tangibilan", "tangibilnost", 
  "tangirati", "tangram", "tango", "tangram", "tanjir", "tanjirač", "tanjirak", "tanjirati", "tanjirić", "tanjirski", 
  "tankoćutan", "tankoćutnost", "tanoburžava", "tanjuga", "tankoća", "tanko", "tanka", "tanjiti", "tanketa", "tanki", 
  "tankoća", "tankoćudan", "tankoćudnost", "tankocrveni", "tankouman", "tank", "tankovi", "tantijema", "tanjenje", "tanjiti",
  "tantala", "tantuz", "tapaciranje", "tapacirati", "tapet", "tapeta", "tapetarski", "tapija", "tapijin", "tapiranje", 
  "tapir", "tapkaroš", "tapkanje", "tapkati", "tara", "taraba", "taran", "tarantela", "tarator", "tarčuk", 
  "tare", "tarenje", "taraba", "tarabica", "tarator", "taranana", "tarantela", "tarapana", "tarator", "tarifa", 
  "tarifni", "tarifiranje", "tarifni", "tašna", "taština", "tašt", "taštost", "taurin", "taurolatrija", "tautologija", 
  "tavan", "tavanski", "tavanica", "tavaniti", "taviti", "tavorenje", "tavoriti", "tvrđava", "taksacija", "takseni", 
  "taksiranje", "taksist", "taksitet", "taksa", "taktička", "taktika", "taktičar", "taktičnost", "taktičan", "taktika", 
  "taktilnost", "taktični", "taktilo", "taktiziraje", "taktiziranje", "takvi", "taksa", "talbuhanje", "talisman", "talas", 
  "talasast", "talasanje", "talasati", "talenat", "talentiran", "taljenje", "taljige", "taloženje", "tambura", "tamjan", 
  "tamnica", "tanad", "tanani", "tandrkanje", "tangenta", "tangirati", "tanak", "tanji", "tanjiti", "tanjir", 
  "taoizam", "topag", "tapaciran", "tapacirati", "tapiserija", "tapka", "tapkanje", "tapkati", "tapšanje", "tara", 
  "tarapana", "tarifa", "tartan", "tata", "tatarski", "tatica", "tatice", "tatino", "tatica", "tatarčak", 
  "tavan", "tavanski", "tavanica", "tavati", "tavorenje", "tavaoriti", "tavica", "tautologija", "tvrditi", "tvrdnja", 
  "tvrđava", "tvrđenje", "tvrđavski", "taština", "tašt", "taštost", "tašta", "taštamajor", "teatar", "teatarski", 
  "teatralan", "teatralnost", "teatralnost", "teatar", "tečaj", "tečnost", "tečno", "tedeum", "tegljenje", "tegobe", 
  "tegobno", "tegleni", "teglica", "tegliti", "tegljač", "tegljenje", "tegljiva", "tegljiv", "tegljivo", "tegljenik", 
  "tegoba", "tegobno", "tegoban", "tehnika", "tehnička", "tehničar", "tehnički", "tehnikum", "tehnolog", "tehnologija", 
  "tehnološki", "tehnofilija", "teizam", "teista", "teistički", "tekstopisac", "tekst", "tekstil", "tekstovi", "tekstualan", 
  "tekući", "tekstura", "tektonika", "tekući", "tekućina", "tekst", "tekstualni", "tekstualnost", "tekstura", "teksturalni", 
  "tekući", "tekućica", "tekutina", "tekija", "tekući", "telegram", "telegraf", "telegrafisati", "telegrafija", "telegrafski", 
  "telekomunikacija", "telefon", "telefonirati", "telefonijski", "telefonski", "telefaks", "telefonist", "telefonista", "telefonistkinja", "telefonica", 
  "telekisa", "telekineza", "telekinetički", "telemarketing", "telematika", "telematski", "telemetar", "telemetrija", "telemometar", "telenovela", 
  "teleologija", "teleološki", "telepatija", "telepatski", "teleskop", "teleskopski", "telesina", "telesni", "telesnina", "telesno", 
  "telesnost", "teletekst", "teletehnički", "teletina", "televizija", "televizijski", "televizor", "teliće", "tel", "tele", 
  "telegrami", "telegraf", "teleologija", "telefonski", "telefon", "telefonista", "telefonirati", "telefonski", "televizija", "televizijski", 
  "televizor", "telenovela", "teleskop", "teleskopski", "telepatija", "telepski", "telesan", "teleta", "telešce", "teletekst", 
  "telidba", "telići", "teličak", "telinjak", "teljenje", "telji", "temat", "tema", "tematizacija", "tematski", 
  "tematizacija", "tematizirati", "tematik", "temelj", "temeljan", "temeljiti", "temeljne", "temeljni", "temeljno", "temeljnost", 
  "temnički", "temnica", "temnjava", "temperament", "temperatura", "temperirati", "temperatura", "temperamentno", "temperamentni", "temperamentnost", 
  "temperancija", "temperirati", "temperovan", "tempiren", "tempirano", "tempiranje", "tempirana", "tempo", "temporalan", "temporalno", 
  "tempovski", "tempura", "tema", "temeljit", "temeljan", "temeljitost", "temeljno", "temurati", "tenacitet", "tenacite", 
  "tendencija", "tendenciozan", "tenderski", "tenis", "tenisač", "teniser", "teniseri", "teniski", "tenor", "tenorski", 
  "teorema", "teoretičar", "teoretički", "teoretisan", "teoretizirati", "teorija", "teorijski", "tepsija", "teracota", "teracot", 
  "teran", "teranija", "terapeutski", "terapeut", "terapija", "terapijski", "terarijum", "terarijumski", "terasa", "teratologija", 
  "terazije", "terbijum", "tercet", "tercina", "terevenke", "terevenkiti", "terenska", "terenski", "teren", "terenska",
  "terenski", "terenac", "teretana", "teretni", "teretovati", "teret", "terevenčenje", "terevenka", "teretnina", "terevenka", 
  "terijalan", "terijer", "teritorij", "teritorija", "teritorijalan", "terijalan", "terminološki", "terminologija", "termički", "termin", 
  "terminator", "terminal", "termini", "terminir", "termit", "termitnjak", "terminom", "termini", "terminalan", "terminativa", 
  "terminirati", "terminizam", "terminiranje", "termionski", "termometar", "termonuklearni", "termodinamika", "termofobija", "termogen", "termogeneza", 
  "termoliza", "termofor", "termometrijski", "termokauter", "termometar", "termotehnički", "termovizija", "terorist", "terorista", "terorizam", 
  "teroristički", "terorizacija", "terpentin", "tersitstvo", "tesan", "tesanje", "tesati", "tesinja", "teslićki", "tesnac", 
  "tesnačak", "tesni", "tesnina", "teslina", "teslin", "tesla", "testamentaran", "testament", "testenica", "testeriši", 
  "testera", "testeraš", "testerica", "testerice", "testerski", "testiranje", "testirati", "testo", "testosteron", "tetanija", 
  "tetanus", "tetiva", "tetraedar", "tetreb", "teturav", "teza", "težak", "težnja", "težina", "težiti",
  
  // U
  "ubaciti", "ubadanje", "ubadati", "ubeđenje", "ubeđen", "ubeđivanje", "ubeđivati", "ubistvo", "ubica", "ubijanje", 
  "ubijati", "ubiti", "ubijen", "ubirati", "ubiranjem", "ubiranje", "ubiti", "ublažiti", "ubod", "ubog", 
  "ubogaljiti", "ubosti", "ubosti", "ubojica", "ubojit", "ubojito", "ubojstvo", "uboštvo", "ubran", "ubrati", 
  "ubrazgati", "ubrbljati", "ubrajan", "ubrajati", "ubran", "ubrana", "ubravši", "ubrizgati", "ubrizgalice", "ubrizgavanje", 
  "ubrojati", "ubrojiti", "ubuduće", "ućeran", "ućutkati", "učauren", "učauriti", "učen", "učenost", "učestvovati", 
  "učešće", "učestalost", "učestalo", "učestao", "učesnik", "učešće", "učestao", "učestati", "učiniti", "učinak", 
  "učini", "učinjeno", "učinkovit", "učinkovitost", "učionički", "učionica", "učitelj", "učiteljica", "učiteljski", "učiti", 
  "učinjen", "učitavati", "učlaniti", "učlanjenost", "učlanjenje", "učmalost", "učmao", "učtiv", "učtivost", "učvrstiti", 
  "učvršćenje", "učvršćivanje", "učvršćen", "udaja", "udaljiti", "udaljenost", "udaljiti", "udaljen", "udaran", "udarac", 
  "udaranje", "udarati", "udariti", "udareni", "udarac", "udariti", "udariti", "udarni", "udarnik", "udarničku", 
  "udarene", "udaren", "udaraca", "udajadba", "udala", "udata", "udav", "udavača", "udavača", "udavlja", 
  "udavljanje", "udavača", "udavačica", "udavati", "udba", "udbina", "udbinski", "udboistički", "udbu", "udelovati", 
  "udeliti", "udelba", "udeo", "udesiti", "udela", "udela", "udesiti", "udesno", "udesan", "udešenost", 
  "udica", "uditi", "udičar", "udica", "udičariti", "udičarski", "udikov", "udjeljenje", "udjel", "udjenuti", 
  "udlaganje", "udlaga", "udno", "udo", "udolinska", "udolina", "udova", "udovac", "udove", "udovi", 
  "udovica", "udoviči", "udovičina", "udovički", "udovičke", "udovištvo", "udovoljiti", "udovoljava", "udovoljavanje", "udovoljeno", 
  "udruženje", "udružiti", "udruženo", "udruženje", "udupašan", "udupašnost", "udupljati", "udvajanje", "udvajati", "udvarak", 
  "udvaran", "udvarač", "udvarački", "udvaranje", "udvarati", "udvojenje", "udvoren", "udvostručiti", "udvostručeno", "ufanje", 
  "uforist", "uforistički", "ugalj", "uganak", "ugao", "ugarci", "ugarak", "ugarin", "ugarski", "ugarica", 
  "ugast", "ugasiti", "ugašen", "ugasiti", "ugasnuti", "ugasit", "ugasio", "ugast", "ugašen", "ugasnuti", 
  "ugibati", "ugibanje", "ugibij", "uglast", "uglavnom", "ugled", "ugledan", "ugledanje", "ugledati", "ugljen", 
  "ugljenisan", "ugljenik", "ugljenisati", "ugljenka", "ugljičan", "ugljičnom", "ugljikov", "ugljičnim", "ugljično", "uglj", 
  "ugljara", "ugljar", "ugljarski", "ugljarenje", "ugljenarski", "ugljenariti", "ugljenica", "ugljeničav", "ugljenje", "ugljevlje", 
  "ugljičan", "ugljikovodički", "ugljični", "ugljičnokisel", "ugljiti", "ugmižati", "ugnijezditi", "ugnjet", "ugnjetavanje", "ugnjetavač", 
  "ugnjetavani", "ugnjetavan", "ugnjetavati", "ugnjeten", "ugnjetena", "ugnjetenje", "ugnosti", "ugodan", "ugoditi", "ugoda", 
  "ugodni", "ugodno", "ugođaj", "ugojen", "ugojiti", "ugojenik", "ugotovim", "ugostitelje", "ugostiteljtvo", "ugostiti", 
  "ugostitelj", "ugostiteljski", "ugostiteljstvo", "ugovaranje", "ugovarati", "ugovor", "ugovoran", "ugovorni", "ugovori", "ugovoriti",
  "ugrabiti", "ugrabljen", "ograđivanje", "ugrevati", "ugrijanost", "ugrijan", "ugrijati", "ugrinuti", "ugriz", "ugrizak", 
  "ugristi", "ugriza", "ugrizati", "ugrliti", "užag", "užagar", "užagati", "užaglenost", "užagorenost", "užagriti", 
  "užagrem", "užaliti", "užalost", "užalošćen", "užaljenost", "užalostititi", "užancija", "užarevati", "užaren", "užarena", 
  "ured", "uredba", "urediti", "uredan", "uređaj", "uređajni", "uređen", "uređenje", "uramiti", "uragan", 
  "uraniti", "urani", "urbanist", "urbanistički", "urbano", "uredništvo", "urednik", "uredovni", "uredski", "uredbeni", 
  "uredna", "urednička", "ureniti", "urenično", "uresi", "ures", "uresin", "uresni", "uresoiti", "uresnost", 
  "urgentno", "urgent", "urgirati", "urgencija", "urgentno", "urgentnost", "urgirajući", "urgirati", "urgiranje", "urlanje", 
  "urlati", "urlik", "urlicanje", "urličući", "urličanje", "urlikan", "urma", "urmetina", "urna", "urobornost", 
  "uročiti", "uročnik", "urođen", "urođenost", "uroklјivost", "urolan", "urolati", "urolog", "urologinja", "urološki", 
  "urolozi", "uroman", "uroš", "urota", "urotnički", "urotnik", "urtonite", "urov", "urovljeno", "urušavanje", 
  "urušavati", "urušiti", "usaditi", "usađen", "usamiti", "usamljen", "usamljenost", "usana", "usahnuti", "usahlo", 
  "usavršiti", "usavršen", "usavršavanje", "usavršavati", "usev", "usećen", "usećenje", "usećivati", "usedelica", "usedeti", 
  "usedlica", "useliti", "useljenik", "usidan", "usidriti", "usidren", "usijanje", "usijan", "usisati", "usisivač", 
  "usječen", "uskititi", "uskočiti", "uskoro", "uskratiti", "uskraćen", "uskraćivati", "uskrsnuće", "uslikati", "uslišiti", 
  "usloviti", "uslovno", "uslovljen", "uslov", "usluga", "uslužan", "uslužnost", "usmeni", "usmeriti", "usmeren", 
  "usmerenost", "usmrćen", "usmrtiti", "usniti", "usnuo", "usov", "uspaljen", "uspavati", "uspeh", "uspešan", 
  "uspon", "usporen", "usporiti", "uspomena", "uspostaviti", "uspraviti", "uspravan", "uspravno", "usprotiviti", "usput", 
  "usputni", "usred", "usrdno", "usredsrediti", "usrećiti", "ustanoviti", "ustanovljen", "ustajati", "ustajao", "ustanak", 
  "ustanički", "ustanova", "ustati", "ustav", "ustavni", "ustavljen", "ustajalost", "ustaljen", "ustaljeno", "ustati", 
  "ustina", "ustiti", "ustinuti", "ustupiti", "ustrojstvo", "ustvrđen", "ustvari", "ustvrditi", "ustvrdjen", "ustupak", 
  "ustupiti", "ustupljen", "usudan", "usugeniti", "usud", "usukan", "usukati", "usuknuti", "usul", "usuret", 
  "usukivanost", "usukivanje", "usukivati", "usula", "usuli", "usuliti", "usumporiti", "usunovrati", "usunovraćen", "usurpatornost", 
  "usurpacija", "usurpator", "usvajanje", "usvojiti", "usvojen", "usvojiti", "uškopiti", "uškopen", "ušuškati", "utabati", 
  "utaman", "utapa", "utapanje", "utapati", "utažiti", "utažen", "utekao", "uteći", "uteha", "utešan", 
  "utešiti", "utemeljiti", "utemeljen", "uterati", "uterivati", "uterivač", "uterivanje", "uterusa", "uterivan", "utešan", 
  "utešitelj", "utešiteljstvo", "utešiti", "utešnost", "utičnica", "uticaj", "uticajnost", "uticajan", "uticati", "utihnuti", 
  "utilitaran", "utinjati", "utisak", "utisnuti", "utisnuće", "utišati", "utišan", "utočen", "utočiti", "utočiti", 
  "utok", "utoliti", "utoljavanje", "utoljavati", "utonda", "utongla", "utopiti", "utopija", "utopijski", "utopist", 
  "utopistički", "utopiti", "utopljen", "utopliti", "utopljavati", "utopljavanje", "utopnog", "utopni", "utopnuti", "utorak", 
  "utoran", "utorak", "utor", "utoreni", "utoriti", "utornik", "utornjak", "utovaren", "utovariti", "utovarni", 
  "utrenik", "utrenički", "utrenik", "utrenici", "utreničar", "utrenički", "utrikularan", "utrina", "utrnuće", "utrnuti", 
  "utrkivanje", "utrljavanje", "utroba", "utroban", "utrobica", "utrojenost", "utrostručiti", "utrostručeno", "utrošak", "utrošiti", 
  "utrošen", "utrpati", "utući", "utučen", "utučenost", "utvara", "utvoren", "utvrda", "utvrditi", "utvrđen", 
  "utvrđenje", "utvrđivanje", "uvala", "uvaljati", "uvaliti", "uvaljen", "uvažavan", "uvažiti", "uvažen", "uvedriti", 
  "uvećan", "uvećati", "uvećati", "uvećavati", "uveden", "uvek", "uvenuti", "uvenuće", "uvenuo", "uveriti", 
  "uveren", "uverenje", "uverljivost", "uverljiv", "uvest", "uvesti", "uvesti", "uvetriti", "uvetren", "uvezan", 
  "uvezati", "uvežbati", "uvezanost", "uvid", "uviđavan", "uviđavnost", "uvideti", "uviđajna", "uviđati", "uvijanje", 
  "uvijati", "uvijen", "uvik", "uvinuti", "uvirati", "uvirilog", "uvirek", "uvirutog", "uvjeren", "uvjerenje", 
  "uvjerljivost", "uvlačiti", "uvodnnik", "uvodni", "uvodničar", "uvoditi", "uvozni", "uvoznik", "uvozno", "uvoznost", 
  "uvođenje", "uvođeni", "uvreda", "uvrediti", "uvredljiv", "uvredljivo", "uvrnuti", "uvrnut", "uvrstiti", "uvršten", 
  "uvučen", "uvući", "uzajamnost", "uzajaman", "uzajmiti", "uzakonjenje", "uzaludnost", "uzalud", "uzaludan", "uzajmljivanje", 
  "uzanik", "uzao", "uzapćen", "uzapćenik", "uzapćenje", "uzaptiti", "uzas", "uzati", "uzastopce", "uzastopni", 
  "uzavrelost", "uzavreo", "uzbaibon", "uzbraditi", "uzbrdo", "uzbrdica", "uzbrdni", "uzbrkati", "uzbuditi", "uzbuđen", 
  "uzbuđenje", "uzbuđivati", "uzbuđivač", "uzbuđivajući", "uzbuđivanje", "uzbuđivati", "uzbunjivanje", "uzbuniti", "uzbunjivač", "uzbunjivati", 
  "uzdah", "uzdahnuti", "uzdano", "uzdanje", "uzdarja", "uzdarje", "uzdarnica", "uzdati", "uzdavati", "uzdavalac", 
  "uzderište", "uzdiogršnica", "uzdiginuti", "uzdignuće", "uzdignuti", "uzdići", "uzdisaj", "uzdisati", "uzdizanje", "uzdizati", 
  "uzdrhtati", "uzdrmati", "uzdrman", "uzdržan", "uzdržanost", "uzdržavanje", "uzdržati", "uzdržavati", "uzdržavajući", "uzdržavanje", 
  "uzdržati", "uzbuniti", "uzeti", "uzeo", "uzengija", "uzgajanje", "uzgajati", "uzgajivač", "uzgajivati", "uzgibati", 
  "uzgor", "uzgredice", "uzgoj", "uzgojen", "uzgojiti", "uzgojnik", "uzibeniti", "uzica", "uzidan", "uzidanost", 
  "uzidati", "uzilazi", "uzimanje", "uzimati", "uzimljivost", "uzimljiv", "uzivljeno", "uzjahati", "uzjogunit", "uzlet", 
  "uzleteti", "uzletište", "uzlomiti", "uzmaći", "uzmak", "uzmicati", "uznačiti", "uznemiriti", "uznemiren", "uznemirenost", 
  "uznemiravati", "uznemiravanje", "uznesiti", "uzobijestan", "uzoholiti", "uzoran", "uzorak", "uzorit", "uzorno", "uzornost"
];

// Dodaj nove reči u rečnik
async function addToMegaDictionary() {
  try {
    // Pročitaj postojeće reči
    const data = fs.readFileSync(dictionaryPath, 'utf8');
    let words = JSON.parse(data);
    
    console.log(`Trenutni broj reči: ${words.length}`);
    
    // Dodaj nove reči
    const uniqueWords = new Set([...words, ...additionalWords]);
    const updatedWords = Array.from(uniqueWords);
    
    // Sačuvaj ažurirani rečnik
    fs.writeFileSync(dictionaryPath, JSON.stringify(updatedWords, null, 2), 'utf8');
    
    console.log(`Novi broj reči: ${updatedWords.length}`);
    console.log(`Dodato ${updatedWords.length - words.length} novih reči.`);
  } catch (error) {
    console.error(`Greška pri dodavanju reči: ${error}`);
  }
}

// Pozovi funkciju
addToMegaDictionary();