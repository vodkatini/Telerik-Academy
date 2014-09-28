using System;
namespace TicTacToe.GameLogic
{
    public class GameResultValidator : IGameResultValidator
    {
        // O-X
        // O-X
        // --X
        public GameResult GetResult(string board)
        {
            if (!IsValidBoard(board))
            {
                throw new ArgumentException("Invalid board");
            }

            if (IsWonByPlayer(board, 'X'))
            {
                return GameResult.WonByX;
            }

            if (IsWonByPlayer(board, 'O'))
            {
                return GameResult.WonByO;
            }

            if (IsDraw(board))
            {
                return GameResult.Draw;
            }

            return GameResult.NotFinished;
        }

        private bool IsWonByPlayer(string board, char player)
        {
            if (CheckByPosition(board, player, 0, 1, 2) ||
                CheckByPosition(board, player, 3, 4, 5) ||
                CheckByPosition(board, player, 6, 7, 8) ||
                CheckByPosition(board, player, 0, 3, 6) ||
                CheckByPosition(board, player, 1, 4, 7) ||
                CheckByPosition(board, player, 2, 5, 8) ||
                CheckByPosition(board, player, 0, 4, 8) ||
                CheckByPosition(board, player, 2, 4, 6))
            {
                return true;
            }

            return false;
        }

        private bool CheckByPosition(string board, char player, int first, int second, int third)
        {
            if (board[first] == player && board[second] == player && board[third] == player)
            {
                return true;
            }
            return false;
        }

        private bool IsDraw(string board)
        {
            for (int i = 0; i < board.Length; i++)
            {
                if (board[i] == '-')
                {
                    return false;
                }
            }
            return true;
        }

        private bool IsValidBoard(string board)
        {
            if (board.Length != 9)
            {
                return false;
            }

            int countX = 0;
            int countO = 0;
            for (int i = 0; i < board.Length; i++)
            {
                if (board[i] == 'X')
                {
                    countX++;
                }
                else if (board[i] == 'O')
                {
                    countO++;
                }
            }

            if (countX != countO && countX + 1 != countO && countX != countO + 1)
            {
                return false;
            }

            return true;
        }
    }
}
