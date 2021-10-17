import React from 'react';
import DogImage from './components/DogImage';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      image: '',
      name: '',
      dogList: [],
    };
  }

  componentDidMount() {
    if (localStorage.namedDogURL) {
      const parseStorage = JSON.parse(localStorage.namedDogURL)
      const lastDog = parseStorage[parseStorage.length -1].image;
      this.setState({
        dogList: parseStorage,
        image: lastDog,
        loading: false,
      });
    } else {
      this.fetchDogAPI();
    }
  }

  shouldComponentUpdate(_nextPros, nextState) {
    if (nextState.image.includes('terrier')) {
      return false;
    }
    return true;
  }

  componentDidUpdate(_prevProps, prevState) {
    const { image } = this.state;
    if (image !== prevState.image) {
      const dogBreed = image.split("/")[4];
      alert(dogBreed);
    }
  }

  fetchDogAPI = () => {
    const URL = 'https://dog.ceo/api/breeds/image/random';
    fetch(URL)
      .then((r) => r.json())
      .then((dataJSON) => {
        const dogImageRandom = dataJSON.message;
        this.setState({
          image: dogImageRandom,
          loading: false,
        });
      });
  }

  saveData = ({ target }) => {
    const { image, name, dogList } = this.state;
    const dogData = { image, name };
    const newDogList = [ ...dogList, dogData ];
    this.setState({
      dogList: newDogList,
      name: '',
    });
    localStorage.setItem('namedDogURL', JSON.stringify(newDogList))
  }

  updateInputText = ({ target }) => {
    const value = target.value
    this.setState({ name: value })
  }

  render() {
    return (
      <div>
        <DogImage { ...this.state } fetchDogAPI={this.fetchDogAPI} updateInputText={this.updateInputText} />
        <button onClick={this.saveData}>Salvar doguinho</button>
      </div>
    );
  }
}

export default App;
