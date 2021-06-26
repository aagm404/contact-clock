# Projeto mobile em React Native  
  
## Sobre o projeto  
  
O projeto foi desenvolvido no decorrer das aulas da disciplina `Mobile-Development` do curso `MBA em Full Stack Developer` da `Impacta`  
  
Utilizamos a plataforma **[Expo](https://expo.io/)** para desenvolvermos independente de alguma plataforma específica  
  
## Executando a aplicação  
  
Instalar as dependências da aplicação e executar o comando `expo start`  
  
## Ejetando a aplicação  
  
Exectuar o comando `expo eject`  

## Bugs conhecidos  
  
1) Na tela inicial da aplicação, o nome da cidade obtida pela geolocalização deveria ser mostrada na tela. Porém, aparece o texto `null` no lugar no nome da cidade para algumas coordenadas específicas. Trata-se de um bug da API de geolocalização do `Expo`. Inclusive, há uma issue aberta acerca do assunto no git do Expo [Reverse geocode returns null city #4828](https://github.com/expo/expo/issues/4828)  
  
2) Não é possível abrir o mapa e mostrar a localização do aparelho que está utilizando a aplicação. A aplicação lança um erro sobre a latitude da coordenada  