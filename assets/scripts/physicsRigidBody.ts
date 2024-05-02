import { _decorator, Component, Node, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('physicsRigidBody')
export class physicsRigidBody extends Component {

    
    private rotation: boolean = false ; 
    private orbitRadius: number = 0; 
    private orbitSpeed: number = 1; 
    private angle: number = 0; 

    start() 
    {
        this.orbitRadius  = this.node.position.x ;
        this.orbitSpeed  = 300/this.orbitRadius ;
    }

    update(deltaTime: number)
    {
        if( this.rotation )
        {
            console.log( " orbitSpeed " , this.orbitSpeed)
            this.angle += this.orbitSpeed * deltaTime;
            // console.log( "delta => " , deltaTime , " angle " , this.angle)
            this.updatePosition();
    
        }
    }

    startRotating()
    {
        this.rotation =  true ;
    }

    updatePosition() 
    {
        const sun = this.node.parent.getComponent(RigidBody2D);
        sun.angularVelocity = 0.5 ;
        const earth = this.node.getComponent(RigidBody2D);
        earth.angularVelocity = 3.5 ;

        const newX = this.orbitRadius * Math.cos(this.angle);
        const newY = this.orbitRadius * Math.sin(this.angle);

        const sunPosition = this.node.parent.getPosition() ;
        this.node.setPosition(sunPosition.x + newX, sunPosition.y + newY);
    }
}
































