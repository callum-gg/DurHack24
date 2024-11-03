// TreeApp.js
import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';

const TreeApp = ({ questions }) => {
  const containerStyles = { width: '100%', height: '100vh' };
  const nodeSize = { x: 120, y: 180 };
  const separation = { siblings: 2, nonSiblings: 3 };

  const [balance, setBalance] = useState(500);
  const [creditScore, setCreditScore] = useState(0);
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    if (questions.length > 0) {
      setTreeData({
        name: questions[0].questionID,
        questionText: questions[0].Question,
        balance,
        creditScore,
        children: Object.entries(questions[0].Answers).map(([answerID, answerDetails]) => ({
          name: answerID,
          answerText: answerDetails.Text,
          balanceIncrement: answerDetails["Balance increment"],
          creditScoreIncrement: answerDetails["Credit score increment"],
          newBalance: balance + answerDetails["Balance increment"],
          newCreditScore: creditScore + answerDetails["Credit score increment"],
          children: [],
        })),
      });
    }
  }, [questions]);

  const addQuestion = (lastAnswerID, questionID) => {
    const question = questions.find(q => q.questionID === questionID);
    if (!question) return;

    setTreeData((prevTree) => {
      const newTree = JSON.parse(JSON.stringify(prevTree));
      const selectedAnswer = findNode(newTree, lastAnswerID);
      if (!selectedAnswer) return prevTree;

      const updatedBalance = selectedAnswer.newBalance;
      const updatedCreditScore = selectedAnswer.newCreditScore;
      setBalance(updatedBalance);
      setCreditScore(updatedCreditScore);

      const newQuestionNode = {
        name: question.questionID,
        questionText: question.Question,
        balance: updatedBalance,
        creditScore: updatedCreditScore,
        children: Object.entries(question.Answers).map(([newAnswerID, answerDetails]) => ({
          name: newAnswerID,
          answerText: answerDetails.Text,
          balanceIncrement: answerDetails["Balance increment"],
          creditScoreIncrement: answerDetails["Credit score increment"],
          newBalance: updatedBalance + answerDetails["Balance increment"],
          newCreditScore: updatedCreditScore + answerDetails["Credit score increment"],
          children: [],
        })),
      };

      selectedAnswer.children.push(newQuestionNode);
      return newTree;
    });
  };

  const findNode = (node, name) => {
    if (node.name === name) return node;
    if (node.children) {
      for (const child of node.children) {
        const result = findNode(child, name);
        if (result) return result;
      }
    }
    return null;
  };

  const wrapText = (text, maxChars) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach(word => {
      if ((currentLine + word).length <= maxChars) {
        currentLine += `${word} `;
      } else {
        lines.push(currentLine.trim());
        currentLine = `${word} `;
      }
    });

    lines.push(currentLine.trim());
    return lines;
  };

  const renderCustomNodeElement = ({ nodeDatum }) => {
    const wrappedText = wrapText(nodeDatum.answerText || nodeDatum.name, 26);

    return (
      <g>
        {nodeDatum.answerText ? (
          <rect width="192" height="132" x="-96" y="-66" fill="#e9ecef" stroke="#adb5bd" strokeWidth="1.5" rx="5" ry="5" />
        ) : (
          <polygon points="0,-66 96,0 0,66 -96,0" fill="#e9ecef" stroke="#adb5bd" strokeWidth="1.5" />
        )}
        {wrappedText.map((line, index) => (
          <text key={index} fill="#495057" fontSize={16} textAnchor="middle" alignmentBaseline="middle" y={-40 + index * 15}>
            {line}
          </text>
        ))}
        {nodeDatum.answerText && (
          <>
            <text fill={nodeDatum.balanceIncrement > 0 ? "green" : nodeDatum.balanceIncrement < 0 ? "red" : "#495057"} fontSize={13} y={wrappedText.length * 15 - 30}>
              Balance: {nodeDatum.newBalance}
            </text>
            <text fill={nodeDatum.creditScoreIncrement > 0 ? "green" : nodeDatum.creditScoreIncrement < 0 ? "red" : "#495057"} fontSize={13} y={wrappedText.length * 15 - 15}>
              Credit Score: {nodeDatum.newCreditScore}
            </text>
          </>
        )}
      </g>
    );
  };

  return (
    <div style={containerStyles}>
      <button onClick={() => addQuestion("a1", "q2")}>Add Question q2 under a1</button>
      <button onClick={() => addQuestion("a4", "q3")}>Add Question q3 under a4</button>
      {treeData && <Tree data={treeData} orientation="vertical" nodeSize={nodeSize} separation={separation} renderCustomNodeElement={renderCustomNodeElement} />}
    </div>
  );
};

export default TreeApp;
