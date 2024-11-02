// src/App.js
import React from 'react';
import Tree from 'react-d3-tree';

// Sample choice history data
const treeData = [
  {
    name: 'Start',
    children: [
      {
        name: 'Chose Option A',
        children: [
          { name: 'Chose Option A1' },
          { name: 'Chose Option A2' }
        ]
      },
      {
        name: 'Chose Option B',
        children: [
          { name: 'Chose Option B1' },
          { name: 'Chose Option B2' },
          { name: 'Chose Option B3' }
        ]
      }
    ]
  }
];

function App() {
  const containerStyles = {
    width: '100%',
    height: '100vh'
  };

  const nodeSize = { x: 100, y: 150 };
  const separation = { siblings: 1.5, nonSiblings: 2.5 };

  // Custom node renderer with anti-aliasing properties for text
  const renderCustomNodeElement = ({ nodeDatum }) => (
    <g>
      {/* Rectangle box with lighter background */}
      <rect
        width="120" 
        height="50" 
        x="-60" 
        y="-25" 
        fill="#e9ecef" 
        stroke="#adb5bd" 
        strokeWidth="1.5"
        rx="5" 
        ry="5"
      />
      {/* Main text with anti-aliasing and outline prevention properties */}
      <text
        fill="#495057"
        fontSize={12}
        fontFamily="Arial, sans-serif"
        fontWeight="normal"
        textAnchor="middle"
        alignmentBaseline="middle"
        style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
        paintOrder="stroke"
        stroke="#e9ecef"
        strokeWidth="0.5"
      >
        {nodeDatum.name}
      </text>
    </g>
  );

  return (
    <div style={containerStyles}>
      <Tree
        data={treeData}
        orientation="vertical"
        nodeSize={nodeSize}
        separation={separation}
        renderCustomNodeElement={renderCustomNodeElement}
      />
    </div>
  );
}

export default App;
