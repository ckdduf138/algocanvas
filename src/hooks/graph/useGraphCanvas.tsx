import { useState, useEffect } from 'react';

import styled from 'styled-components';

import { getClosestAndFurthestNode, Link, Node, NodeFocusStatus, NodeGraphData, NodeGraphHeightPadding, NodeRadius } from '../../utils/graphData';
import { useDragCopy } from '../../hooks/graph/useDrag';
import { useWindowSize } from '../getWindowSize';
import { useEditEdge } from './useEditEdge';
import { useSVGEvents } from './useSvgEvents';
import { useTheme } from '../../context/themeContext';
import { useGraphCanvasUI } from './useGraphCanvasUI';

export const Circle = styled.circle<{ $focusStatus?: NodeFocusStatus, $theme: string }>`
  fill: #D9D9D9;
  stroke: ${props => props.$theme === 'light' ? 'black' : 'white'};;
  stroke-width: 3;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));

  cursor: pointer;
`;

export const CircleText = styled.text<{$theme: string}>`
  fill: ${props => props.$theme === 'light' ? 'black' : 'black'};
  font-size: 48px;
  dominant-baseline: middle;
  text-anchor: middle;
  pointer-events: none;
  user-select: none;
`;

export const Line = styled.line<{$theme: string}>`
  stroke: ${props => props.$theme === 'light' ? 'black' : 'white'};
  stroke-width: 5;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
  cursor: pointer;
`;

export const useGraphCanvas = () => {
  const [nodeGraphData, setNodeGraphData] = useState<NodeGraphData>({nodes: [], links: []});
  const [selectedEdge, setSeletedEdge] = useState<boolean>(false);

  const { draggingCircle, draggingNode, handleMouseDown, handleMouseDownNode, dragMouseMove, dragMouseUp } = useDragCopy();

  const { randomizeGraphData, resetGraphData } = useGraphCanvasUI(setNodeGraphData);
  const { updateHandlers } = useSVGEvents({});

  const { draggingEdge, edgeMouseDown, createEdgeMouseDown  } = useEditEdge(nodeGraphData);

  const { width, height } = useWindowSize();

  const {theme} = useTheme();

  useEffect(() => {
    updateHandlers(dragMouseMove, handleDrop);
  },[draggingCircle]);

  useEffect(() => {
    if (!nodeGraphData) return;
  
    const { nodes } = nodeGraphData;
  
    const updatedNodes = nodes.map((currentNode) => {
      const { x, y } = currentNode;
  
      const boundary = {
        left: NodeRadius + 2,
        right: width - NodeRadius - 2,
        top: NodeRadius + 2,
        bottom: height * 0.8 - NodeGraphHeightPadding - NodeRadius - 7
      };
  
      const isOutOfBounds = x < boundary.left || x > boundary.right || y < boundary.top || y > boundary.bottom;
  
      if (isOutOfBounds) {
        return {
          ...currentNode,
          x: Math.max(boundary.left, Math.min(x, boundary.right)),
          y: Math.max(boundary.top, Math.min(y, boundary.bottom))
        };
      }
  
      return currentNode;
    });
  
    const nodesChanged = !nodes.every((node, index) => 
      node.x === updatedNodes[index].x && node.y === updatedNodes[index].y
    );
  
    if (nodesChanged) {
      setNodeGraphData((prevData) => {
        if (!prevData) return prevData;
        
        return {
          ...prevData,
          nodes: updatedNodes,
        };
      });
    }

  }, [nodeGraphData, width, height]);

  useEffect(() => {
    if (!draggingNode) return;
  
    setNodeGraphData((prevData) => {
      if (!prevData) return prevData;
  
      const updatedNodes = prevData.nodes.map((node) =>
        node.id === draggingNode.id ? { ...node, ...draggingNode } : node
      );
  
      return {
        ...prevData,
        nodes: updatedNodes,
      };
    });
  }, [draggingNode]);

  const handleEdgeClick = () => {
    setSeletedEdge(!selectedEdge);
  };

  const handleDrop = () => {
    if (!draggingCircle) return;
  
    const newNode: Node = {
      id: nodeGraphData?.nodes.length.toString(),
      x: draggingCircle.cx,
      y: draggingCircle.cy,
      radius: draggingCircle.radius,
      focus: 'inactive'
    };
  
    const newLink: Link = {
      source: (parseInt(newNode.id) - 1).toString(),
      target: newNode.id,
    };
  
    setNodeGraphData((prevData) => {
      if (!prevData) {
        return {
          nodes: [newNode],
          links: [newLink],
          focus: 'inactive',
        };
      }

      return {
        nodes: [...prevData.nodes, newNode],
        links: [...prevData.links, newLink]
      };
    });
  
    dragMouseUp();
  };

  const handleRandomizeGraphData = (numNodes: number) => {
    randomizeGraphData(numNodes);
  };

  const handleResetGraphData = () => {
    resetGraphData();
  };

  const nodeGraphDatas = {
    nodes: nodeGraphData?.nodes,
    links: nodeGraphData?.links,
  };

  const CustomNode: React.FC<{ node: Node }> = ({ node }) => {    
    const foundNodeData: Node | undefined = nodeGraphData.nodes.find(nodes => nodes.id === node.id);

    const handleMouseDown = (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();

      if(!foundNodeData) return;

      if(selectedEdge) {
        createEdgeMouseDown(foundNodeData);
      }
      else {
        handleMouseDownNode(foundNodeData);
      }
    };

    return (
      <>
        <Circle $focusStatus={foundNodeData?.focus} id={node.id} r={NodeRadius} $theme={theme}
          onMouseDown={handleMouseDown}
        />
        <CircleText x={0} y={0} $theme={theme}>{node.id}</CircleText>
      </>
    );
  };

  const CustomLink: React.FC<{ link: { source: string; target: string; dashed?: boolean } }> = ({ link }) => {
    const sourceNode = nodeGraphData?.nodes.find(node => node.id === link.source);
    const targetNode = nodeGraphData?.nodes.find(node => node.id === link.target);

    if (!sourceNode || !targetNode) return null;

    const handleMouseDown = (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      
      const closestNode: [Node, Node] = getClosestAndFurthestNode({ x: e.clientX, y: e.clientY }, sourceNode, targetNode);
      if(closestNode) {
        edgeMouseDown(e, closestNode);
      }
    };

    return (
      <Line 
        x1={sourceNode.x}
        y1={sourceNode.y} 
        x2={targetNode.x} 
        y2={targetNode.y}
        strokeOpacity={0.6}
        strokeDasharray={link.dashed ? '8,4' : undefined} 
        $theme={theme}
        onMouseDown={handleMouseDown}
      />
    );
  };

  return {
    nodeGraphDatas,
    draggingCircle,
    selectedEdge,
    draggingEdge,
    CustomNode,
    CustomLink,
    handleMouseDown,
    handleEdgeClick,
    handleRandomizeGraphData,
    handleResetGraphData
  };
};