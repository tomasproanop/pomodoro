function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const audio = document.getElementById('beep');

class App extends React.Component {








  constructor(props) {
    super(props);_defineProperty(this, "state", { breakCount: 5, sessionCount: 25, clockCount: 25 * 60, currentTimer: 'Session', isPlaying: false });_defineProperty(this, "handlePlayPause",







    () => {
      const { isPlaying } = this.state;

      if (isPlaying) {
        clearInterval(this.loop);

        this.setState({
          isPlaying: false });

      } else {
        this.setState({
          isPlaying: true });


        this.loop = setInterval(() => {
          const {
            clockCount,
            currentTimer,
            breakCount,
            sessionCount } =
          this.state;

          if (clockCount === 0) {
            this.setState({
              currentTimer: currentTimer === 'Session' ? 'Break' : 'Session',
              clockCount: currentTimer === 'Session' ? breakCount * 60 : sessionCount * 60 });


            audio.play();
          } else {
            this.setState({
              clockCount: clockCount - 1 });

          }

        }, 1000);
      }
    });_defineProperty(this, "handleReset",

    () => {
      this.setState({
        breakCount: 5,
        sessionCount: 25,
        clockCount: 25 * 60,
        currentTimer: 'Session',
        isPlaying: false });


      clearInterval(this.loop);

      audio.pause();
      audio.currentTime = 0;
    });_defineProperty(this, "convertToTime",

    count => {
      let minutes = Math.floor(count / 60);
      let seconds = count % 60;

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      return `${minutes}:${seconds}`;
    });_defineProperty(this, "handleLengthChange",

    (count, timerType) => {
      const {
        sessionCount,
        breakCount,
        isPlaying,
        currentTimer } =
      this.state;

      let newCount;

      if (timerType === 'session') {
        newCount = sessionCount + count;
      } else {
        newCount = breakCount + count;
      }

      if (newCount > 0 && newCount < 61 && !isPlaying) {
        this.setState({
          [`${timerType}Count`]: newCount });


        if (currentTimer.toLowerCase() === timerType) {
          this.setState({
            clockCount: newCount * 60 });

        }
      }
    });_defineProperty(this, "handleBreakDecrease",

    () => {
      const { breakCount, isPlaying, currentTimer } = this.state;

      if (breakCount > 1) {
        if (!isPlaying && currentTimer === 'Break') {
          this.setState({
            breakCount: breakCount - 1,
            clockCount: (breakCount - 1) * 60 });

        } else {
          this.setState({
            breakCount: breakCount - 1 });

        }
      }
    });_defineProperty(this, "handleBreakIncrease",

    () => {
      const { breakCount, isPlaying, currentTimer } = this.state;

      if (breakCount < 60) {
        if (!isPlaying && currentTimer === 'Break') {
          this.setState({
            breakCount: breakCount + 1,
            clockCount: (breakCount + 1) * 60 });

        } else {
          this.setState({
            breakCount: breakCount + 1 });

        }
      }
    });_defineProperty(this, "handleSessionDecrease",

    () => {
      const { sessionCount, isPlaying, currentTimer } = this.state;

      if (sessionCount > 1) {
        if (!isPlaying && currentTimer === 'Session') {
          this.setState({
            sessionCount: sessionCount - 1,
            clockCount: (sessionCount - 1) * 60 });

        } else {
          this.setState({
            sessionCount: sessionCount - 1 });

        }
      }
    });_defineProperty(this, "handleSessionIncrease",

    () => {
      const { sessionCount, isPlaying, currentTimer } = this.state;

      if (sessionCount < 60) {
        if (!isPlaying && currentTimer === 'Session') {
          this.setState({
            sessionCount: sessionCount + 1,
            clockCount: (sessionCount + 1) * 60 });

          //       } else {
          this.setState({
            sessionCount: sessionCount + 1 });

        }
      }
    });this.loop = undefined;}componentWillUnmount() {clearInterval(this.loop);}

  render() {
    const {
      breakCount,
      sessionCount,
      clockCount,
      currentTimer,
      isPlaying } =
    this.state;

    const breakProps = {
      title: 'Break',
      count: breakCount,
      handleDecrease: () => this.handleLengthChange(-1, 'break'),
      handleIncrease: () => this.handleLengthChange(1, 'break') };


    const sessionProps = {
      title: 'Session',
      count: sessionCount,
      handleDecrease: () => this.handleLengthChange(-1, 'session'),
      handleIncrease: () => this.handleLengthChange(1, 'session') };


    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "flex" }, /*#__PURE__*/
      React.createElement(SetTimer, breakProps), /*#__PURE__*/
      React.createElement(SetTimer, sessionProps)), /*#__PURE__*/


      React.createElement("div", { className: "clock-container" }, /*#__PURE__*/
      React.createElement("h1", { id: "timer-label" }, currentTimer), /*#__PURE__*/
      React.createElement("span", { id: "time-left" }, this.convertToTime(clockCount)), /*#__PURE__*/


      React.createElement("div", { className: "flex" }, /*#__PURE__*/
      React.createElement("button", { id: "start_stop", onClick: this.handlePlayPause }, /*#__PURE__*/
      React.createElement("i", { className: `fa fa-${isPlaying ? 'pause' : 'play'}` })), /*#__PURE__*/

      React.createElement("button", { id: "reset", onClick: this.handleReset }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-refresh" }))))));




  }}


const SetTimer = props => {
  const id = props.title.toLowerCase();

  return /*#__PURE__*/(
    React.createElement("div", { className: "timer-container" }, /*#__PURE__*/
    React.createElement("h2", { id: `${id}-label` },
    props.title, " Length"), /*#__PURE__*/

    React.createElement("div", { className: "flex actions-wrapper" }, /*#__PURE__*/
    React.createElement("button", { id: `${id}-decrement`, onClick: props.handleDecrease }, /*#__PURE__*/
    React.createElement("i", { className: "fa fa-minus" })), /*#__PURE__*/


    React.createElement("span", { id: `${id}-length` }, props.count), /*#__PURE__*/

    React.createElement("button", { id: `${id}-increment`, onClick: props.handleIncrease }, /*#__PURE__*/
    React.createElement("i", { className: "fa fa-plus" })))));




};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));