import React from 'react';

class DogImage extends React.Component {

  renderImage = () => {
    const { loading, image, fetchDogAPI, name, updateInputText } = this.props;
    const loadingText = <span>Loading...</span>;
    return (
      <div>
        <input
          type="text"
          value={name}
          onChange={updateInputText}
          placeholder="Digite o nome do doguinho!"
        />
        <button type="button" onClick={fetchDogAPI}>Próxima foto</button>
        <p>Doguinho</p>
        {loading ? loadingText : <img src={ image } alt="cachorro aleatório" />}
      </div>
    )
  }

  render() {    
    return (
        this.renderImage()
    );
  }
}

export default DogImage;