import React, { useState } from 'react';
import Tree from 'react-d3-tree';

const Allquestions = require('./questions.json');
const questions = Allquestions[0]; // Assuming `questions.json` is an array of question objects

function App() {
  const containerStyles = { width: '100%', height: '100vh' };
  const nodeSize = { x: 120, y: 180 }; // Increase both x and y for more spacing between nodes
  const separation = { siblings: 2, nonSiblings: 3 }; // Increase separation for better readability

  // Initialize the balance, credit score, and tree data in state
  const [balance, setBalance] = useState(500);
  const [creditScore, setCreditScore] = useState(0); // Initial credit score
  const [treeData, setTreeData] = useState({
    name: questions[0].questionID,
    questionText: questions[0].Question,
    balance, // Start with the initial balance
    creditScore, // Start with the initial credit score
    children: Object.entries(questions[0].Answers).map(([answerID, answerDetails]) => ({
      name: answerID,
      answerText: answerDetails.Text,
      balanceIncrement: answerDetails["Balance increment"],
      creditScoreIncrement: answerDetails["Credit score increment"],
      newBalance: balance + answerDetails["Balance increment"], // Calculate new balance for each answer
      newCreditScore: creditScore + answerDetails["Credit score increment"], // Calculate new credit score
      children: [],
    })),
  });

  const getQuestionById = (questionID) => questions.find(q => q.questionID === questionID);

  const addQuestion = (lastAnswerID, questionID) => {
    const question = getQuestionById(questionID);
    if (!question) return;

    setTreeData((prevTree) => {
      const newTree = JSON.parse(JSON.stringify(prevTree)); // Clone tree to avoid mutation

      const selectedAnswer = findNode(newTree, lastAnswerID);
      if (!selectedAnswer) return prevTree;

      // Update balance and credit score
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

  // Function to split text into multiple lines for wrapping
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
    // Increase maxChars to allow each line to extend closer to the edges
    const wrappedText = wrapText(nodeDatum.answerText || nodeDatum.name, 26); 
  
    return (
      <g>
        {/* Conditional rendering for shape: diamond for questions, rectangle for answers */}
        {nodeDatum.answerText ? (
          // Rectangle for answer nodes
          <rect width="192" height="132" x="-96" y="-66" fill="#e9ecef" stroke="#adb5bd" strokeWidth="1.5" rx="5" ry="5" />
        ) : (
          // Diamond for question nodes
          <polygon
            points="0,-66 96,0 0,66 -96,0"
            fill="#e9ecef"
            stroke="#adb5bd"
            strokeWidth="1.5"
          />
        )}
  
        {/* Render text differently for question and answer nodes */}
        {nodeDatum.answerText ? (
          // Wrapped text for answer nodes, centered and extending closer to edges
          wrappedText.map((line, index) => (
            <text
              key={index}
              fill="#495057"
              fontSize={16} // Increased font size for answer nodes
              fontFamily="Arial, sans-serif"
              textAnchor="middle"
              alignmentBaseline="middle"
              y={-40 + index * 15} // Adjust line spacing, shifted up
              style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
              stroke="#e9ecef"
              strokeWidth="0.5"
              paintOrder="stroke"
            >
              {line}
            </text>
          ))
        ) : (
          // Larger, centered text for question nodes
          <text
            fill="#495057"
            fontSize={36} // Make text 3x larger for question nodes
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
            alignmentBaseline="middle"
            style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
            stroke="#e9ecef"
            strokeWidth="0.5"
            paintOrder="stroke"
          >
            {nodeDatum.name}
          </text>
        )}
  
        {/* Balance Text (only for answer nodes), with dynamic color */}
        {nodeDatum.answerText && (
          <>
            <text
              fill={
                nodeDatum.balanceIncrement > 0 ? "green" :
                nodeDatum.balanceIncrement < 0 ? "red" : "#495057" // Neutral color if no change
              }
              fontSize={13}
              fontFamily="Arial, sans-serif"
              textAnchor="middle"
              alignmentBaseline="middle"
              y={wrappedText.length * 15 - 30} // Position balance label higher
              style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
              stroke="#e9ecef"
              strokeWidth="0.5"
              paintOrder="stroke"
            >
              Balance: {nodeDatum.newBalance}
            </text>
  
            {/* Credit Score Text (only for answer nodes), with dynamic color */}
            <text
              fill={
                nodeDatum.creditScoreIncrement > 0 ? "green" :
                nodeDatum.creditScoreIncrement < 0 ? "red" : "#495057" // Neutral color if no change
              }
              fontSize={13}
              fontFamily="Arial, sans-serif"
              textAnchor="middle"
              alignmentBaseline="middle"
              y={wrappedText.length * 15 - 15} // Position credit score label slightly higher
              style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
              stroke="#e9ecef"
              strokeWidth="0.5"
              paintOrder="stroke"
            >
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
      <button onClick={() => addQuestion("a7", "q4")}>Add Question q4 under a7</button>

      {treeData && (
        <Tree
          data={treeData}
          orientation="vertical"
          nodeSize={nodeSize}
          separation={separation}
          renderCustomNodeElement={renderCustomNodeElement}
        />
      )}
    </div>
  );
}

export default App;
