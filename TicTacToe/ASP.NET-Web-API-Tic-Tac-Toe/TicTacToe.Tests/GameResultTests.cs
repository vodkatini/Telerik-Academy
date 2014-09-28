using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using TicTacToe.GameLogic;

namespace TicTacToe.Tests
{
    [TestClass]
    public class GameResultTests
    {

        private IGameResultValidator validator;

        [TestInitialize]
        public void Initialize()
        {
            this.validator = new GameResultValidator();
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void InvalidBoardShouldThrowException()
        {
            string board = "1234567890";
            this.validator.GetResult(board);
        }

        [TestMethod]
        public void PlayerXWon()
        {
            string board = "XXO" +
                           "XOO" +
                           "XO-";
            var result = this.validator.GetResult(board);
            var expected = GameResult.WonByX;
            Assert.AreEqual(expected, result);
        }

        [TestMethod]
        public void PlayerOWon()
        {
            string board = "OO-" +
                           "XOX" +
                           "XO-";
            var result = this.validator.GetResult(board);
            var expected = GameResult.WonByO;
            Assert.AreEqual(expected, result);
        }

        [TestMethod]
        public void GameIsDraw()
        {
            string board = "OXO" + 
                           "XOX" +
                           "XOX";
            var result = this.validator.GetResult(board);
            var expected = GameResult.Draw;
            Assert.AreEqual(expected, result);
        }

        [TestMethod]
        public void GameIsNotFinished()
        {
            string board = "OXO" +
                           "XOX" +
                           "--X";
            var result = this.validator.GetResult(board);
            var expected = GameResult.NotFinished;
            Assert.AreEqual(expected, result);
        }
    }
}
