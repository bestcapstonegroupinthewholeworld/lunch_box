import React, {Component} from 'react'

class Circles extends Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
  
    componentDidMount() {
      this.setState(this.myRef)
    }
  
    render() {
      const colors = ["#60d2da", "#5cc87c", "#f2b940", "#FCBC0F", "#F85F36"];
      const numBalls = 100;
      const balls = [];
    
      for (let i = 0; i < numBalls; i++) {
        let ball = document.createElement("div");
        ball.classList.add("ball");
        ball.style.background = colors[Math.floor(Math.random() * colors.length)];
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        ball.style.width = `${Math.random()}em`;
        ball.style.height = ball.style.width;
        balls.push(ball);
        const el = this.myRef.current;
        if(el) {
          el.append(ball)
        }
      }
      balls.forEach((el, i, ra) => {
        let to = {
          x: Math.random() * (i % 2 === 0 ? -11 : 11),
          y: Math.random() * 12
        };
      
        let anim = el.animate(
          [
            { transform: "translate(0, 0)" },
            { transform: `translate(${to.x}rem, ${to.y}rem)` }
          ],
          {
            duration: (Math.random() + 1) * 2000, // random duration
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out"
          }
        );
      });
  
      return (
        <div id="floatingCircles" ref={this.myRef} style={{ width: '100%', maxHeight: '100vh', position:'absolute', left: '0', top: '0', position: 'fixed', opacity: '0.7' } }>   
        </div>
      ) 
    }
    
  }

  export default Circles;