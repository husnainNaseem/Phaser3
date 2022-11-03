import Phaser, { LEFT } from 'phaser';
import ScoreLabel from '../UI/ScoreLabel';
const GROUND_KEY = 'ground';
const DUDE_KEY = 'dude';
const STAR_KEY = 'star'

export default class GameScene extends Phaser.Scene 
{
    constructor()
    {
        super('game-scene')
    }

    preload()
    {
        this.load.image('sky','../public/assets/sky.png')
        this.load.image(GROUND_KEY,'../public/assets/platform.png')
        this.load.image(STAR_KEY,'../public/assets/apple.png')
        this.load.image('bomb','../public/assets/bomb.png')

        this.load.spritesheet(DUDE_KEY,
            '../public/assets/dude.png',
            {frameWidth: 32, frameHeight: 48}
        )
    }

    create()
    {
        this.add.image(400, 300, 'sky')

        const platforms = this.createPlatforms()
        this.player = this.createPlayer()
        const stars = this.createStar()

        this.physics.add.collider(this.player, platforms)
        this.physics.add.collider(stars, platforms)

        this.cursors = this.input.keyboard.createCursorKeys()
        this.physics.add.overlap(this.player, stars, this.collectStar, null, this)

        // this.scoreLabel = this.createScoreLabel(16,16,0)
    }

    update()
	{
		if (this.cursors.left.isDown)
		{
			this.player.setVelocityX(-160)

			this.player.anims.play('left', true)
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(160)

			this.player.anims.play('right', true)
		}
		else
		{
			this.player.setVelocityX(0)

			this.player.anims.play('turn')
		}

		if (this.cursors.up.isDown )
		{
			this.player.setVelocityY(-160);
		}

        // For double Jump
        var jump = 0;
        if (this.player.body.touching.down) 
        {
            jump = 2;
        }
        
        if (this.cursors.up.isDown && jump > 0) 
        {
            jump--;
            this.player.setVelocityY(-30);
        }
	}

    createPlatforms()   
    {
        const platforms = this.physics.add.staticGroup()
        platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody()

        platforms.create(400, 450, GROUND_KEY)
        platforms.create(150, 350, GROUND_KEY)
        platforms.create(700, 350, GROUND_KEY)
        platforms.create(380,250, GROUND_KEY)
        platforms.create(800,160, GROUND_KEY)
        platforms.create(100,160, GROUND_KEY)
        platforms.create(450,80, GROUND_KEY)
        // const grid = this.add.grid(300, 300, 600, 500, 48, 128, 0xc145ea)

        return platforms
    }

    createStar()
    {
        const stars = this.physics.add.group({
            key: STAR_KEY,
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 90}
        })

        stars.children.iterate((child)=>{
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })

        // const grid = this.add.grid(600, 300, 100, 500, 48, 128, 0xc145ea).setAltFillStyle(0xb038d7).setOutlineStyle().setAngle(180);

        return stars
    }

    collectStar(player, star)
    {
        star.disableBody(true, true)
    }
    
    createPlayer()
    {
        const player = this.player = this.physics.add.sprite(100, 450, DUDE_KEY)
        player.setBounce(0.2)
        player.setCollideWorldBounds(true)
        

        const   player2 = this.physics.add.sprite(100, 450, 'dude');

player2.setBounce(0.2);
player2.setCollideWorldBounds(true);

this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames(DUDE_KEY, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turn',
            frames: [{ key: DUDE_KEY, frame: 4 }],
            frameRate: 20
        })

        this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		})

        // createScoreLabel(x, y, score)
        // {
        //     const style = { fontSize: '30px', fill: '#000'}
        //     const label = new ScroleLabel(this,x, y, style)

        //     this.add.existing(label)
        //     return label
        // }

        return player
    }
}