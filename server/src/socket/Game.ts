import { Server } from 'socket.io'
import AreaClass from '../class/Area.js'
import ItemClass from '../class/Item.js'
import { ISocketPlayer } from './Socket.js'
import CharacterClass from '../class/Character.js'

export type TypeRoundPhase =
  | 'action'
  | 'select-area'
  | 'search-area'
  | 'debrief'

class Game {
  io: Server
  roomId: string
  areas: AreaClass[]
  rounds: number
  roundPhase: TypeRoundPhase
  currentRound: number
  votes: Record<string, string[]>
  timer: NodeJS.Timeout | null

  constructor(io: Server, roomId: string) {
    this.io = io
    this.roomId = roomId
    this.areas = []
    this.rounds = 5
    this.roundPhase = 'action'
    this.currentRound = 1
    this.votes = {}
    this.timer = null
  }

  setupAreas() {
    const bedroomNicolas = new AreaClass('bedroom-nicolas', [
      new ItemClass(
        `Tiroir de la table de nuit `,
        `Lettres de menace de Marcus qui parle de tout révéler`,
        'bedroom-nicolas',
        false,
        '',
        10,
        10
      ),
      new ItemClass(
        `Armoire de Nicolas`,
        `Rien de signifiant...`,
        'bedroom-nicolas',
        false,
        '',
        20,
        20
      ),
      new ItemClass(
        `Penderie de Nicolas`,
        `Rien de signifiant...`,
        'bedroom-nicolas',
        false,
        '',
        30,
        30
      ),
      new ItemClass(
        `Bouquets de fleur sur la table basse`,
        `Signé “LDV“ à “Mon bichon”`,
        'bedroom-nicolas',
        false,
        '',
        40,
        40
      ),
      new ItemClass(
        `Tiroir de la table de chevet`,
        `Rien de signifiant...`,
        'bedroom-nicolas',
        false,
        '',
        50,
        50
      ),
      new ItemClass(
        `Documents dans la poubelle`,
        `Parle de la neige et de la glace dans le piano de Nicolas`,
        'bedroom-nicolas',
        true,
        'analyze-object',
        60,
        60
      ),
      new ItemClass(
        `Lit défait `,
        `Rien de signifiant...`,
        'bedroom-nicolas',
        false,
        '',
        70,
        70
      ),
      new ItemClass(
        `Sacoche de Nicolas`,
        `Rien de signifiant...`,
        'bedroom-nicolas',
        false,
        '',
        80,
        80
      ),
      new ItemClass(
        `MP3 sur la table de chevet`,
        `Rien de signifiant...`,
        'bedroom-nicolas',
        false,
        '',
        90,
        90
      ),
    ])

    const deskNicolas = new AreaClass(
      'desk-nicolas',
      [
        new ItemClass(
          `Portefeuille de Nicolas sur le bureau`,
          `Photo de Ludivine cachée à l’intérieur`,
          'desk-nicolas',
          false,
          '',
          10,
          10
        ),
        new ItemClass(
          `Pochette en papier remplie de photos sur le bureau`,
          `Photos de Marcus prises à son insu`,
          'desk-nicolas',
          false,
          '',
          20,
          20
        ),
        new ItemClass(
          `Petit cadre photo sur le bureau`,
          `Photo cachée d’une femme aux cheveux blonds à la tâche brune sur la joue et d’un bébé aux cheveux blonds`,
          'desk-nicolas',
          false,
          '',
          30,
          30
        ),
        new ItemClass(
          `Grand cadre photo sur le bureau`,
          `Rien de signifiant...`,
          'desk-nicolas',
          false,
          '',
          40,
          40
        ),
        new ItemClass(
          `Piano sur lequel on a retrouvé Nicolas`,
          `Rien de signifiant...`,
          'desk-nicolas',
          false,
          '',
          50,
          50
        ),
        new ItemClass(
          `Téléphone de Nicolas sur le bureau`,
          `Messages houleux de Ludivine parlant de neige et de glace`,
          'desk-nicolas',
          false,
          '',
          60,
          60
        ),
        new ItemClass(
          `Ouverture sous le piano sur lequel on a retrouvé Nicolas`,
          `Poudres et cristaux blancs`,
          'desk-nicolas',
          false,
          '',
          70,
          70
        ),
        new ItemClass(
          `Entre les cordes du piano sur lequel on a trouvé Nicolas`,
          `Rien de signifiant...`,
          'desk-nicolas',
          false,
          '',
          80,
          80
        ),
        new ItemClass(
          `Veste de Nicolas sur la chaise de bureau`,
          `Rien de signifiant...`,
          'desk-nicolas',
          false,
          '',
          90,
          90
        ),
        new ItemClass(
          `Ordinateur de Nicolas sur le bureau`,
          `Rien de signifiant...`,
          'desk-nicolas',
          false,
          '',
          20,
          70
        ),
        new ItemClass(
          `Bibliothèque de Nicolas`,
          `Rien de signifiant...`,
          'desk-nicolas',
          false,
          '',
          60,
          20
        ),
      ],
      true
    )

    const kitchen = new AreaClass('kitchen', [
      new ItemClass(
        `Verre de vin rouge pétillant de Nicolas`,
        `Verre drogué`,
        'kitchen',
        true,
        'analyze-substance',
        10,
        10
      ),
      new ItemClass(
        `Téléphone de Sophie sur la table à manger`,
        `Nombreuses recherches internet sur la vie de Nicolas`,
        'kitchen',
        true,
        'hacking',
        20,
        20
      ),
      new ItemClass(
        `Veste de Paul`,
        `Pochons de cocaïne dans une poche`,
        'kitchen',
        false,
        'analyze-substance',
        30,
        30
      ),
      new ItemClass(
        `Cardigan de Sophie`,
        `Rien de signifiant...`,
        'kitchen',
        false,
        '',
        40,
        40
      ),
      new ItemClass(
        `Verre de vin blanc pétillant de Ludivine`,
        `Rien de signifiant...`,
        'kitchen',
        false,
        '',
        50,
        50
      ),
      new ItemClass(
        `Verre de rhum de Marcus `,
        `Rien de signifiant...`,
        'kitchen',
        false,
        '',
        60,
        60
      ),
      new ItemClass(
        `Verre de scotch de Paul`,
        `Rien de signifiant...`,
        'kitchen',
        false,
        '',
        70,
        70
      ),
      new ItemClass(
        `Écharpe de Sophie`,
        `Rien de signifiant...`,
        'kitchen',
        false,
        '',
        80,
        80
      ),
    ])

    const bathroom = new AreaClass('bathroom', [
      new ItemClass(
        `Baignoire`,
        `Rien de signifiant...`,
        'bathroom',
        false,
        '',
        10,
        10
      ),
      new ItemClass(
        `Évier`,
        `Rien de signifiant...`,
        'bathroom',
        false,
        '',
        20,
        20
      ),
      new ItemClass(
        `Toilettes`,
        `Rien de signifiant...`,
        'bathroom',
        false,
        '',
        30,
        30
      ),
      new ItemClass(
        `Panier à linge sale`,
        `Rouge à lèvres, texture crème, rose sur une chemise sale de Nicolas`,
        'bathroom',
        false,
        '',
        40,
        40
      ),
      new ItemClass(
        `Placard à pharmacie`,
        `Rien de signifiant...`,
        'bathroom',
        false,
        '',
        50,
        50
      ),
      new ItemClass(
        `Miroir de salle de bain`,
        `Rien de signifiant...`,
        'bathroom',
        false,
        '',
        60,
        60
      ),
      new ItemClass(
        `Produits de bain sur la baignoire`,
        `Rien de signifiant...`,
        'bathroom',
        false,
        '',
        70,
        70
      ),
    ])

    const livingroom = new AreaClass('livingroom', [])

    const bedroomMarcus = new AreaClass('bedroom-marcus', [
      new ItemClass(
        `Cendrier sur la table de nuit`,
        `Rien de signifiant...`,
        'bedroom-marcus',
        false,
        '',
        60,
        60
      ),
      new ItemClass(
        `Brosse à dents`,
        `Rien de signifiant...`,
        'bedroom-marcus',
        false,
        '',
        70,
        70
      ),
      new ItemClass(
        `Sandwish déjà croqué`,
        `Rien de signifiant...`,
        'bedroom-marcus',
        false,
        '',
        80,
        80
      ),
      new ItemClass(
        `Valise de Marcus`,
        `Rien de signifiant...`,
        'bedroom-marcus',
        false,
        '',
        90,
        90
      ),
    ])

    const bedroomSophie = new AreaClass('bedroom-sophie', [
      new ItemClass(
        `Penderie de Sophie`,
        `Rien de signifiant...`,
        'bedroom-sophie',
        false,
        '',
        10,
        35
      ),
      new ItemClass(
        `Table de nuit de Sophie`,
        `Rien de signifiant...`,
        'bedroom-sophie',
        false,
        '',
        83.75,
        47
      ),
      new ItemClass(
        `Table basse de Sophie`,
        `Rien de signifiant...`,
        'bedroom-sophie',
        false,
        '',
        51,
        49.3
      ),
      new ItemClass(
        `Valise de Sophie`,
        `Injections œstrogènes combinées avec de la progestérone`,
        'bedroom-sophie',
        true,
        'analyze-substance',
        16.6,
        80
      ),
      new ItemClass(
        `Ordinateur de Sophie sur un siège`,
        `Analyse ADN: Nicolas est le père de Sophie`,
        'bedroom-sophie',
        true,
        'hacking',
        35,
        56.6
      ),
      // new ItemClass(
      //   `Manteau de Sophie`,
      //   `Rien de signifiant...`,
      //   'bedroom-sophie',
      //   false,
      //   '',
      //   20,
      //   50
      // ),
      // new ItemClass(
      //   `Portefeuille de Sophie`,
      //   `Photo d’une femme aux cheveux blonds à la tâche brune sur la joue`,
      //   'bedroom-sophie',
      //   false,
      //   '',
      //   20,
      //   50
      // ),
      // new ItemClass(
      //   `Trousse de maquillage de Sophie`,
      //   `Rien de signifiant...`,
      //   'bedroom-sophie',
      //   false,
      //   '',
      //   20,
      //   50
      // ),
      new ItemClass(
        `Trousse de toilette de Sophie`,
        `Rien de signifiant...`,
        'bedroom-sophie',
        false,
        '',
        60,
        33.2
      ),
      new ItemClass(
        `Post-its écrasés dans la poubelle`,
        `“Nico, nous devons parler...”, “Nico, rendez-vous dans ton bureau quand tout le monde sera couché”`,
        'bedroom-sophie',
        false,
        '',
        91.9,
        68.8
      ),
    ])

    const bedroomLudivine = new AreaClass('bedroom-ludivine', [
      new ItemClass(
        `Sac à main de Ludivine`,
        `Lettre de menace émise par Nicolas qui parle de tout révéler`,
        'bedroom-ludivine',
        false,
        '',
        10,
        10
      ),
      new ItemClass(
        `Trousse de maquillage de Ludivine`,
        `Rien de signifiant...`,
        'bedroom-ludivine',
        false,
        '',
        20,
        20
      ),
      new ItemClass(
        `Trousse de toilette de Ludivine`,
        `Anxiolitiques dans un petit pot`,
        'bedroom-ludivine',
        false,
        '',
        30,
        30
      ),
      new ItemClass(
        `Penderie de Ludivine`,
        `Rien de signifiant...`,
        'bedroom-ludivine',
        false,
        '',
        40,
        40
      ),
      new ItemClass(
        `MP3 de fourrure de Ludivine`,
        `Rien de signifiant...`,
        'bedroom-ludivine',
        false,
        '',
        50,
        50
      ),
      new ItemClass(
        `MP3 sur la table basse`,
        `Gravé "LDV"`,
        'bedroom-ludivine',
        false,
        '',
        60,
        60
      ),
      new ItemClass(
        `Téléphone de Ludivine sur la table de nuit`,
        `Rien de signifiant...`,
        'bedroom-ludivine',
        false,
        '',
        70,
        70
      ),
      new ItemClass(
        `Valise de Ludivine`,
        `Rien de signifiant...`,
        'bedroom-ludivine',
        false,
        '',
        80,
        80
      ),
      new ItemClass(
        `Ordinateur de Ludivine sur la table basse`,
        `Rien de signifiant...`,
        'bedroom-ludivine',
        false,
        '',
        90,
        90
      ),
    ])

    const bedroomPaul = new AreaClass('bedroom-paul', [
      new ItemClass(
        `Valise de Paul`,
        `Contient une courte paille en métal`,
        'bedroom-paul',
        false,
        '',
        10,
        10
      ),
      new ItemClass(
        `Penderie de Paul`,
        `Rien de signifiant...`,
        'bedroom-paul',
        false,
        '',
        20,
        20
      ),
      new ItemClass(
        `Téléphone de Paul sur le lit`,
        `On trouve que son dernier appel est avec un centre de désintoxication`,
        'bedroom-paul',
        true,
        'hacking',
        30,
        30
      ),
      new ItemClass(
        `Manteau de Paul sur le porte-manteau`,
        `Rien de signifiant...`,
        'bedroom-paul',
        false,
        '',
        40,
        40
      ),
      new ItemClass(
        `Pantalon défait sur le lit`,
        `Rien de signifiant...`,
        'bedroom-paul',
        false,
        '',
        50,
        50
      ),
      new ItemClass(
        `Ordinateur de Paul sur le lit`,
        `Rien de signifiant...`,
        'bedroom-paul',
        false,
        '',
        60,
        60
      ),
      new ItemClass(
        `Table basse de Paul`,
        `Carte de visite pour un centre de désintoxication dans le porte-cartes`,
        'bedroom-paul',
        false,
        '',
        70,
        70
      ),
    ])

    this.areas = [
      bedroomNicolas,
      deskNicolas,
      kitchen,
      bathroom,
      livingroom,
      bedroomMarcus,
      bedroomSophie,
      bedroomLudivine,
      bedroomPaul,
    ]
  }

  setupPlayers(players: ISocketPlayer[]) {
    const characterOne = new CharacterClass(
      'ludivine',
      `Ludivine a tué Nicolas par peur qu’il dévoile à ses proches qu’elle est sa maîtresse. Elle suspectait également qu’il voie une autre femme. Il l’enrageait pour le manque de considération qu’il avait à son égard et sa manie de la menacer de tout balancer au moindre désagrément.`,
      true,
      [
        `Ongle cassé dans la salle de bain`,
        `Portefeuille de Nicolas dans le bureau`,
        `Vernis dans la chambre de Ludivine`,
        `Vernis dans la chambre`,
        `MP3 gravé LL dans la chambre`,
        `Chemise de Nicolas dans la Salle de bain`,
        `Téléphone de Nicolas dans le bureau`,
      ]
    )

    const characterTwo = new CharacterClass(
      'marcus',
      `Il n’a pas tué Nicolas, mais il a récemment découvert que Nicolas prévoyait de mettre leur gigantesque traffic de cocaine et de métamphétamine sur son dos afin de l’éliminer des élections.`
    )

    const characterThree = new CharacterClass(
      'paul',
      `Il n’a pas tué Nicolas, mais il est l’un des livreurs de Paul et Marcus. Il est récemment devenu accro à la cocaine et la métamphétamine. Il voit sa vie s’écrouler et le leur reproche. Il le cache à Ludivine et essaie de se remettre sur le droit chemin.`
    )

    const characterFour = new CharacterClass(
      'sophie',
      `Sophie est une jeune médecin qui travaille à Paris 9 dans le quartier Saint-Georges. Elle est la médecin personnelle de Nicolas.`
    )

    const characters = [
      characterOne,
      characterTwo,
      characterThree,
      characterFour,
    ]

    players.forEach((player, index) => {
      const character = characters[index]
      player.character = character
    })

    return players
  }

  setupGame(players: ISocketPlayer[]) {
    this.setupAreas()
    const newPlayers = this.setupPlayers(players)

    return newPlayers.map((player) => ({
      ...player,
      isReady: false,
    }))
  }

  startActionPhase() {
    this.currentRound++
    this.roundPhase = 'action'
  }

  startSelectAreaPhase() {
    this.roundPhase = 'select-area'
  }

  async startSearchAreaPhase() {
    this.roundPhase = 'search-area'
    return new Promise<boolean>((resolve) => {
      this.startTimer(20, () => {
        resolve(true)
      })
    })
  }

  startDebriefPhase() {
    this.roundPhase = 'debrief'
  }

  startTimer(seconds: number, callback: () => void) {
    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = setTimeout(() => {
      this.timer = null
      return callback()
    }, seconds * 1000)
  }

  stopTimer() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  collectItem(
    incomingPlayer: ISocketPlayer,
    incomingItemId: ItemClass['id'],
    incomingAreaId: string
  ) {
    const isHandFree =
      incomingPlayer.currentRoundItems.length <
      incomingPlayer.itemsPickupCapacity
    const area = this.areas.find((area) => area.id === incomingAreaId)
    const item = area?.items.find((item) => item.id === incomingItemId)

    if (isHandFree && area && item && !item.isPickedUp) {
      item.isPickedUp = true
      return item
    }
  }
}

export default Game
