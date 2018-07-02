import GameModel from '../model/game-model';
import TimerModel from '../model/timer-model';
import LevelType1View from '../view/level-type-1-view';
import LevelType2View from '../view/level-type-2-view';
import LevelType3View from '../view/level-type-3-view';
import GameProgressView from '../view/game-progress-view';
import {GameResult} from '../data/game-data';
import {LEVELS, TaskType} from '../data/levels';
import App from '../app';
import {renderGameProgress} from '../functions';

export default class GamePresenter {
  constructor(levelIndex) {
    this.model = new GameModel();
    this.levelIndex = levelIndex;
    this.viewGameProgress = new GameProgressView();
    this.model = new GameModel();
    this.timer = new TimerModel();
  }

  init() {
    console.log(LEVELS);
    this.timer.reStartTimer();
    this.timer.startTimer();
    this.timer.levelFailed = () => {
      this.model.answerWrong();
      App.showGame(LEVELS[this.levelIndex + 1]);
    };
    /* GAME OVER! */
    if (this.model.getCurrentLives() === 0) {
      /* Выходим из игрового экрана и показываем экран статистики */
      this.timer.stopTimer();
      App.showResult(GameResult.LOSS);
      return;
    }

    /* Победа в игре и переход к экрану статистики! */
    if (LEVELS[this.levelIndex].type === null) {
      this.timer.stopTimer();
      App.showResult(GameResult.VICTORY);
      return;
    }

    renderGameProgress(this.viewGameProgress.element);

    if (LEVELS[this.levelIndex].type === TaskType.TWO_PAINTINGS_OR_PHOTOS) {
      this.view = new LevelType1View(LEVELS[this.levelIndex]);
    } else if (LEVELS[this.levelIndex].type === TaskType.PAINTING_OR_PHOTO) {
      this.view = new LevelType2View(LEVELS[this.levelIndex]);
    } else if (LEVELS[this.levelIndex].type === TaskType.ONE_PAINTING_OF_THREE_IMAGES) {
      this.view = new LevelType3View(LEVELS[this.levelIndex]);
    }

    App.showScreen(this.view.element);
    this.view.onChangeScreen = () => App.showGame(LEVELS[this.levelIndex + 1]);
  }
}