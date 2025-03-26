import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dictionaryPath = path.resolve(__dirname, '../server/data/serbian-dictionary-mega.json');

// Nove srpske reči za dodati - slovo R
const additionalWords = [
  // R
  "rabinar", "rabiti", "rabljeni", "rabota", "rabotan", "rabotati", "rabotnik", "racionalista", "racionalizam", "racionalan",
  "racionalizacija", "racionalizirao", "racionalizirati", "račić", "račji", "račka", "računa", "računalski", "računalni",
  "računar", "računarac", "računarev", "računaljka", "računanje", "računati", "računalo", "računalni", "računica", "račundžija",
  "računi", "računovođa", "računovodstvo", "računovođa", "računski", "radak", "radar", "raden", "radenički", "radešine",
  "radica", "radičević", "radički", "radić", "radiestezijski", "radin", "radinost", "radio", "radiografija", "radiologija",
  "radioveza", "radijalni", "radijator", "radikal", "radikalizam", "radikulitis", "radim", "radiofobija", "radiofrekfencija", "radiofonijski",
  "radiohirugijam", "radioaktivan", "radiofoničan", "radiofoničar", "radiofoničnost", "radiofonist", "radiofonija", "radiogram", "radiografija", "radiohidrometar",
  "radiohirurg", "radiohirurgija", "radiohirurški", "radioizotop", "radiokarbonski", "radiolitički", "radiolog", "radiologija", "radiološki", "radion",
  "radionički", "radionica", "radiooperater", "radiopatetički", "radioreporter", "radioskopski", "radiotelegrafist", "radioveza", "radišan", "radišnost",
  "radius", "radijum", "radijus", "raditi", "radijum", "radion", "raditi", "radite", "radiusom", "radite",
  "radišnost", "radišan", "radijusni", "radjao", "radijalac", "radijalan", "radijacija", "radijator", "radijski", "radikalna",
  "radikalno", "radikalizam", "radinović", "radišan", "radjalo", "radjanje", "radjeni", "radjen", "radjene", "radjen",
  "radijalni", "radiološki", "radnički", "radni", "radioamateri", "radioaparata", "radioaparat", "radioamaterski", "radioastronom", "radioastronomija",
  "radioaparatura", "radiovesti", "radiomačak", "radioprijemnik", "radioprijemnici", "radioprenos", "radioprogram", "radioprograma", "radiosamoobrana", "radiošou",
  "radiostanica", "radiostanice", "radioštop", "radiotaksista", "radiotehničar", "radiotehnika", "radiotelefon", "radiotelefoni", "radioteleskop", "radioterapija",
  "radioton", "radiovesti", "radioviziografija", "radiovizija", "radiovodiči", "radiovodič", "radiovalovi", "radiozal", "radiozapis", "radiozračno",
  "radiše", "radišnost", "raditi", "radilištu", "radilište", "radino", "radijum", "radionica", "radionički", "radionicu",
  "radiofobija", "radiofrekfencija", "radiofoničan", "radiofoničar", "radiofoniski", "radiofrecvencije", "radiofobičan", "radiofobičar", "radiofrekventno", "radiofrekvencije",
  "radiofonija", "radiofonijski", "radiog", "radiogoniometrijski", "radiografski", "radiogram", "radiogranične", "radiokarbonska", "radiokarbonom", "radiokarbonskim",
  "radiokompanijska", "radiokoncesija", "radiol", "radiolink", "radiomačak", "radiomaska", "radiooprema", "radiopostaja", "radiopredaja", "radiorecepcija",
  "radiostanica", "radiotaksista", "radiotehničar", "radiotehnika", "radioterapija", "radiotaksista", "radiotehničar", "radiotehnika", "raditi", "radiotelefon",
  "radiotelefoni", "radioteleskop", "radioterapija", "radiotelegram", "radiotelegrafski", "radioterapijski", "radiotransparentnost", "radioton", "radiotranzistor", "radiotranzistorski",
  "radiotrasmisijski", "radiotrasmiter", "radiovesti", "radioviziografija", "radiovizija", "radiovodiči", "radiovodič", "radiovalovi", "radioveza", "radiozal",
  "radiozapis", "radiozračno", "radioligant", "radioizotop", "radioimunoesej", "radioimunološki", "radioizotopni", "radionički", "radionica", "radiooperater",
  "radiopatetički", "radioreporter", "radioskopski", "radiotelefon", "radiotelegrafist", "radioveza", "raditi", "radioligand", "radionica", "radionuklid",
  "radioprogram", "radiorelej", "radioreleja", "radioreleja", "radiost", "radiostanica", "radiostudiji", "radiostudiji", "radioteatar", "radiovrsta",
  "radiće", "radiološki", "radilišni", "radius", "radijum", "radijusni", "radijusno", "radijusa", "radikal", "radikalna",
  "radikalizacija", "radikalno", "radikalna", "radikalno", "radikalizam", "radikalom", "radikalski", "radikalstvo", "radiometrija", "radiometrijsko",
  "radiotipsko", "radioxvat", "radislavski", "radišan", "radih", "radijalno", "radijant", "radijanti", "radijaciju", "radijator",
  "radimice", "radini", "radin", "radinost", "radinstva", "radiosignal", "radioolimpijada", "radiookoliš", "radioprostor", "radiopredajni",
  "radiopostaja", "radioprijemnik", "radioprogram", "radiostrana", "radiostrah", "radiospot", "radiostanica", "radiotelevizija", "radioterapijski", "radioterapiju",
  "radioton", "radiovalove", "radiovalovi", "radiovaloviti", "radiozvuk", "radišan", "radišnost", "radiše", "radiša", "raditi",
  "radićevski", "radićevska", "radjeni", "radjen", "radjenje", "radlica", "radljavica", "radmanovski", "radmila", "radmilo",
  "radni", "radnica", "radnicki", "radnički", "radnik", "radnima", "radništvo", "radobojan", "radodar", "radodavac",
  "radodavca", "radodajno", "radoholičar", "radojka", "radosav", "radoslav", "radoslav", "radosna", "radosnica", "radosno",
  "radost", "radostan", "radošću", "radoznalost", "radoznalo", "radoznalac", "radoznanac", "radovan", "rafal", "rafalski",
  "rafinerija", "raga", "ragastov", "raglan", "raglja", "ragusina", "rai", "raja", "rajčica", "rajčicu",
  "rajčine", "raje", "raje", "rajfešlus", "rajin", "rajnica", "rajna", "rajnski", "rajnska", "rajon",
  "rajonizirani", "raju", "rajski", "rajter", "rak", "rakčev", "rakčeva", "rakčevo", "rakčevi", "rakčevih",
  "rakčevim", "rakčevima", "rakčevom", "rakčica", "raketa", "raketni", "raketaš", "rakičevac", "rakicin", "rakijski",
  "rakija", "rakijati", "rakijaški", "rakijašnica", "rakijaš", "rakita", "rakitnjak", "raklić", "raklje", "rakljaš",
  "rakljast", "rakljati", "rakljavi", "raklje", "raknuti", "rakolovac", "rakoljubac", "rakoljubi", "rakoljubac", "rakom",
  "rakova", "rakovi", "rakovski", "rakovica", "rakovički", "rakovina", "ralica", "ram", "ramadanski", "rambutan",
  "ramažica", "ramena", "rameni", "ramenski", "ramet", "ramifikacija", "rami", "ramljak", "ramljaska", "ramljački",
  "ramljak", "ramt", "rampa", "ramski", "ramzesovski", "ramljanje", "ramovski", "rampa", "rampas", "ramu",
  "ramus", "ranac", "ranama", "rančići", "ranč", "rančer", "rančevi", "rančiranje", "randman", "rang",
  "rangirani", "ranijava", "raniji", "ranilac", "ranina", "ranica", "ranjenički", "ranjenik", "ranjioca", "ranjenici",
  "ranjenika", "ranjenikove", "ranjenikovo", "ranjenikovog", "ranjenikovom", "ranjenim", "ranjenima", "ranjen", "ranjivost", "ranjiv",
  "ranjuga", "raskomotiti", "raskoš", "raskošan", "raskrčiti", "raskrsnica", "raskriti", "raskriće", "raskrvaviti", "raskućiti",
  "raskvašen", "raskvašiti", "raslinje", "raslojiti", "rasni", "raspad", "raspadanje", "raspadati", "raspakati", "raspaliti",
  "raspekmeziti", "raspevan", "raspevati", "raspirivač", "raspiritati", "raspis", "raspisati", "raspitoljen", "rasplamsati", "rasplakati",
  "rasplamsati", "rasplesti", "rasplesti", "rasplinjavanje", "rasplinjati", "rasplod", "rasploditi", "raspodeliti", "raspodela", "raspolagati",
  "raspoložen", "raspoložiti", "raspon", "rasporediti", "rasporiti", "raspored", "rasprava", "raspravljati", "raspraviti", "raspravljač",
  "raspravljanje", "raspravni", "raspravljen", "raspravljiv", "raspravljivati", "raspreten", "raspresti", "rasprsnuti", "raspršiti", "raspršen",
  "raspršivač", "raspuklina", "raspust", "rastakanje", "rastanak", "rastaći", "rastaviti", "rastavljen", "rastava", "rasterati",
  "rasteretiti", "rastezati", "rastezljiv", "rastinje", "rastočen", "rastovarenje", "rastovariti", "rastočiti", "rastojanje", "rastopiti",
  "rastopljen", "rastočen", "rastočenost", "rastočiti", "rastočivati", "rastrava", "rastrčati", "rastreseno", "rastrojstvo", "rastrubiti",
  "rastrzanost", "rastućim", "rasturiti", "rasudba", "rasuditi", "rasulo", "rasut", "rasuće", "rasušiti", "raščupati",
  "raščišćavati", "raščišćen", "raščistiti", "rašeta", "raširiti", "raširenje", "rašlje", "raškir", "raškljaka", "rašomon",
  "rašpati", "raštiman", "raštimati", "raštrkanost", "raštimovanost", "raštrkavanje", "raštrkati", "raštrkano", "raštrkanje", "raštrkavati",
  "ratar", "ratarstvo", "ratatuj", "ratifikacija", "ratificiranje", "ratni", "ratnički", "ratnik", "ratovanje", "ratovati",
  "ratoboran", "ratus", "rav", "ravalica", "ravan", "ravnajući", "ravnalo", "ravnalac", "ravnatelj", "ravnanje",
  "ravnati", "ravan", "ravnina", "ravnica", "ravno", "ravnodušan", "ravnodušnost", "ravnomjerno", "ravnomjeran", "ravnomjernost",
  "ravnopravnost", "ravnopravan", "ravnoteža", "ravnjati", "razabrati", "razagnati", "razapeti", "razapinjati", "razarač", "razaranje",
  "razarati", "razastrti", "razastrijeti", "razbacati", "razbacivati", "razbacan", "razbesneti", "razbibriga", "razbijač", "razbijati",
  "razbirati", "razbistren", "razbistriti", "razbitak", "razbiti", "razboj", "razbojište", "razbojnik", "razboleti", "razboritost",
  "razborit", "razbrajanje", "razbrojavati", "razbucati", "razbuda", "razbratiti", "razbuktati", "razcvjetati", "razdaljina", "razdavanje",
  "razdeljen", "razdeljeni", "razdeljenje", "razdeljivati", "razdeo", "razderavanje", "razdešenost", "razdevičiti", "razdijeliti", "razdijeljeno",
  "razdirati", "razdirući", "razdjetinjiti", "razdjel", "razdjeljcni", "razdor", "razdragati", "razdražen", "razdražiti", "razdražljiv",
  "razdrmati", "razdrobiti", "razdrljiti", "razdružiti", "razdvojenost", "razdvojiti", "razdvostručiti", "razdvojiti", "razdvojan", "razdvajati",
  "razgalamiti", "razgibavati", "razglas", "razglasiti", "razglabati", "razgledanje", "razgledati", "razglednica", "razglobiti", "razglobljavati",
  "razgolićen", "razgolititi", "razgovarati", "razgovor", "razgovorljiv", "razgovetno", "razgovetnost", "razgraničiti", "razgrađ", "razgranati",
  "razgrebati", "razgrtati", "razguravanje", "razići", "razilaziti", "razina", "razjasniti", "razjapiti", "razjaren", "razjasniti",
  "razjašnjenje", "razjapiti", "razjariti", "razjarenost", "razjeda", "razjedati", "razjedinjenos", "razjediniti", "razjuriti", "razlaganje",
  "razlagati", "razleteti", "razlikovati", "razlika", "razlivan", "razliti", "razliven", "razljutiti", "razlizati", "razljesk",
  "razljubiti", "razljućenost", "razlomak", "razlog", "razložan", "razložiti", "razložno", "razmirica", "razmak", "razmaknuti",
  "razmaziti", "razmatranje", "razmatrati", "razmažen", "razmaženo", "razmena", "razmeniti", "razmenjivati", "razmeravati", "razmer",
  "razmerica", "razmeđje", "razmeštaj", "razmestiti", "razmicati", "razmičan", "razmijeniti", "razmileti", "razmiljevati", "razmisliti",
  "razmjena", "razmjestiti", "razmišljanje", "razmišljati", "razmjenjivost", "razmjeriti", "razmjeran", "razmjerno", "razmjestiti", "razmještaj",
  "razmještati", "razmlitavljen", "razmnoživost", "razmnožavanje", "razmnožavati", "razmnožiti", "razmoćen", "razmočiti", "razmotavanje", "razmotati",
  "razmotriti", "razmrdavanje", "razmrđen", "razmrskati", "razmrsiti", "razmrznuti", "raznašati", "razne", "raznebeštati", "razneblušiti",
  "raznesentimentaliti", "raznesiti", "raznizan", "raznizati", "raznji", "različnost", "raznik", "raznim", "raznobojni", "raznoliki",
  "raznolik", "raznolikost", "raznoliko", "raznorazno", "raznorodnost", "raznorodan", "raznoobraznost", "raznosač", "raznositi", "raznosmer",
  "raznovrsnost", "raznovrsan", "raznovrsje", "raznovrstan", "raznošenje", "razobličiti", "razočaran", "razočaranost", "razočaran", "razočarati",
  "razočarenje", "razodeven", "razodeti", "razodevanje", "razodjeti", "razodjenuti", "razonode", "razorati", "razoružan", "razoružati",
  "razor", "razoran", "razorest", "razorit", "razoriti", "razornost", "razotkriti", "razoteti", "razov", "razračunati",
  "razrasti", "razred", "razrediti", "razredni", "razreknuti", "razrijeden", "razrijediti", "razrjeđen", "razriješiti", "razrješiti",
  "razrješenje", "razrok", "razrovati", "razrovan", "razrovast", "razrušen", "razrušiti", "razudan", "razudje", "razudjen",
  "razudjeno", "razudjenost", "razudjivanje", "razulaćeno", "razulavati", "razulje", "razulje", "razum", "razuman", "razumati",
  "razumeti", "razumijevanje", "razumjeti", "razumljiv", "razumlje", "razumništvo", "razumnost", "razumom", "razumovski", "razumsko",
  "razuzdan", "razuzdanost", "razuveravati", "razvedriti", "razvedran", "razvedravati", "razvedren", "razvedrenost", "razvedriiti", "razvejati",
  "razvezati", "razvezan", "razvezivati", "razvezla", "razvezivač", "razvezivala", "razvezivanje", "razvezivati", "razveseliti", "razvestiti",
  "razvez", "razvezanost", "razvezati", "razvezavati", "razvezivati", "razvezan", "razveseljen", "razvezujući", "razvezan", "razvezanost",
  "razvezati", "razvezavati", "razvezla", "razvezivala", "razvezivanje", "razvezivati", "razveseljen", "razvezujući", "razvezivač", "razvi",
  "razviće", "razvijanje", "razvijati", "razvijen", "razvijenost", "razviti", "razviti", "razvitost", "razvlačenje", "razvlačiti",
  "razvod", "razvoditi", "razvodnjavanje", "razvodniti", "razvoj", "razvojačenje", "razvojni", "razvojna", "razvrat", "razvraćanje",
  "razvraćenost", "razvratan", "razvratnica", "razvratnik", "razvratnost", "razvrstavanje", "razvrstati", "razvrstanost", "razvrstavalac", "razvučen",
  "razvući", "ražanj", "ražalovati", "ražanj", "ražeći", "ražalosno", "ražalostiti", "ražaljena", "ražaliti", "ražaljen",
  "ražaljenost", "ražalovanje", "ražalovati", "ražanj", "rašćenje", "rašćerati", "rašćerivati", "rašćešljati", "rašća", "rašće",
  "rašćenje", "rašćeravanje", "rašćerati", "rašćerivati", "rašćešljanje", "rašćešljati", "rašćišćavanje", "rašćišćavati", "rašeta", "raška",
  "raški", "rašlje", "rašljast", "rašljasto", "rašljati", "rašomon", "raštanj", "raštika", "raštimati", "raštrkanost",
  "raštrkavanje", "raštrkati", "raštrkano", "raštrkanje", "raštrkavati", "raštrkavca", "rašuntati", "rašunjao", "rašpati", "raščerek",
  "raščerekati", "raščerepati", "raščerupati", "raščerupan", "raščerupavati", "raščešljavanje", "raščetvorivati", "raščetvoriti", "raščiniti", "raščinjati",
  "raščinjen", "raščinjenik", "raščinjivani", "raščišćavanje", "raščišćavati", "raščišćen", "raščistiti", "raščistivši", "raščlaniti", "raščlanjivati",
  "raščovečiti", "raščovječiti", "raščupan", "raščupati", "raščvrljati", "ražanac", "ražani", "ražanj", "ražariti", "ražderati",
  "ražđipiti", "ražđuvariti", "ražđuvareno", "ražestitit", "ražestiti", "ražgizditi", "rženje", "ržišni", "ržište", "ržnuti",
  "ržulj", "reagovanje", "reakcija", "reakcionar", "reakcionaran", "realizam", "realisti", "realizacija", "realizator", "realizirati",
  "realističan", "realan", "realnost", "rebro", "recept", "recesija", "recipient", "recikliranje", "recitacija", "recitator",
  "redakcija", "redakcijski", "redigovati", "redak", "redikulozno", "reditelj", "redovan", "redovno", "redukcija", "reducirati",
  "referenca", "referent", "refleks", "refleksija", "refleksivan", "reflektirati", "reflektori", "reforma", "reformacija", "reformator",
  "refugium", "regenerirati", "regent", "regia", "regija", "regijski", "reglementacija", "regresija", "regresivan", "regrutacija",
  "regrutiran", "regrut", "regulator", "regularna", "regularno", "regulirati", "rehabilitacija", "reinkarnacija", "rejon", "rekapitulirati",
  "reklama", "reklamacija", "reklamirati", "rekonstrukcija", "rekreacija", "rekreirati", "rektalgia", "rekvizit", "relacija", "relativno",
  "relativitet", "relativnost", "relej", "relevantan", "religio", "religija", "religijski", "religiozan", "religioznost", "relikti",
  "relikt", "relogija", "remedijum", "reminiscencija", "remizirati", "remonstrirati", "rendgen", "renovirati", "rentabilnost", "repati",
  "repertoar", "repete", "repeticija", "repetitio", "replika", "replicirati", "reprezentativac", "reprezentativno", "reprezentacija", "reprint",
  "reproducirati", "reprodukcija", "republik", "republika", "republikanski", "reputacija", "rerum", "resanktificirati", "resanktifikacija", "resica",
  "reska", "resor", "respiracija", "respirator", "restauracija", "restaurator", "restante", "restauriran", "rešetati", "rešetka",
  "rezultat", "rezultanta", "rezultirati", "retardacija", "retencija", "retorika", "retorički", "retor", "retribucija", "retrospekcija",
  "retrovizor", "reuma", "reumatizam", "revakscinacija", "revalorizacija", "revelacija", "reverberirati", "reverend", "revers", "reversal",
  "revija", "revijalan", "revijski", "revitalizacija", "revitalizirati", "revizija", "revizor", "revizionirat", "revizionizam", "revnost",
  "revokacija", "revoltan", "revolucionar", "revolucionarni", "revolucija", "revolver", "revoltirati", "rezerva", "rezervat", "rezervacija",
  "rezervist", "rezerviran", "rezervisati", "rezač", "rezanje", "rezati", "rezbarija", "rezben", "rezbar", "rezbarstvo",
  "rezeda", "rezidencija", "rezidbeni", "rezidirati", "rezignirati", "rezime", "rezultirati", "rezonancija", "rezonirati", "rezolucija",
  "rezoner", "rezreda", "režija", "režirati", "režiser", "režim", "ribar", "ribarnica", "ribarstvo", "ribizla",
  "riblji", "ribnjak", "riba", "ribica", "rič", "ričet", "rigips", "rigorozno", "rijeka", "rijedak",
  "rijeka", "riješen", "riječ", "riječi", "rika", "rikati", "riknuti", "rima", "rimljanin", "rimska",
  "ringeriti", "rinta", "risaći", "risati", "riskirati", "risovina", "ritam", "ritual", "rivijera", "rizik",
  "rizik", "rizikovanje", "riznica", "rižin", "rječit", "rječitost", "rječkanje", "rječkati", "rječni", "rječnik",
  "rječca", "rjeđi", "rješavati", "rješenje", "rješiv", "roba", "robot", "robotiziran", "robotika", "rocvieće",
  "ročište", "ročni", "rodbina", "roditelj", "roditi", "rodijak", "rodni", "rodom", "rodoslovlje", "rođen",
  "rođendan", "roj", "rojiti", "roktanje", "roktati", "rolati", "rolada", "romanist", "romansa", "romantičan",
  "romb", "roniti", "ronilac", "rositi", "rosni", "rosan", "rosno", "rotacijski", "rotacija", "rotarika",
  "rotirati", "rotkvica", "roza", "rozasta", "rov", "rovati", "rovašiti", "rozete", "rozetice", "rozetirati",
  "rubeola", "rubin", "rublje", "rubrika", "rucak", "rucanje", "rucan", "ručak", "rucati", "ručica",
  "ručna", "ručni", "ručno", "rudarski", "rudar", "rudiment", "rudimentalan", "rudina", "rudnik", "rudnjača",
  "ruganje", "ruga", "rugati", "rugalica", "ruganje", "rugati", "ruglo", "rugoba", "ruj", "rujan",
  "rujni", "ruka", "rukav", "rukavica", "rukovanje", "rukovati", "rukovaoć", "rukohvat", "rukovatelj", "rukovodioc",
  "rukovoditelj", "rukovodstvo", "rukopis", "rulet", "ruma", "rumba", "rumeni", "rumeniti", "rumenilo", "rumenkast",
  "rumunski", "runolista", "rupčaga", "rupcić", "rupičast", "rupa", "rupica", "rusizam", "rusifikacija", "rusificirati",
  "ruski", "rusalka", "ruse", "ruti", "rutav", "rutavi", "rutinirati", "rutinski", "rutina", "ruvati"
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