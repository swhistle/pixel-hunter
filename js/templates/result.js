import ResultView from '../view/result-view';
import {showScreen, container} from '../functions';
import gameCurrentState from './game-state';

const moduleResult = () => {
  gameCurrentState();

  const result = new ResultView();

  showScreen(result.element);

  /** TODO убрать хардкорное удаление блока с игровым прогрессом **/
  container.nextElementSibling.remove();
};

export default moduleResult;
