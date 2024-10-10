export const algorithmTypes: { [key: string]: string[] } = {
    '자료구조': ['#F9B6FF', '#FFC499'],
    '정렬': ['#9AA4FF', '#95E4FF'],
    '그래프': ['#9AFFAA', '#FCFF7E'],
    '기하학': ['#FFD3B6', '#F1E4D3'],
};

export const tagColors: { [key: string]: string } = {
    '자료구조': '#F9B6FF',
    '정렬': '#9AA4FF',
    '배열': '#95E4FF',
    '그래프': '#9AFFAA',
    '탐색': '#FCFF7E',
    '선입선출': '#FFD580',
    '후입선출': '#FFB6C1',
    '분할정복': '#B3FFB6',
    '힙': '#FFC8A2',
    '큐': '#FFD580',
    '스택': '#FFB6C1',
    '우선순위 큐': '#FFD580',
    '동적계획법': '#FFDAA5',
    '유니온-파인드': '#E1FF9E',
    '기하학': '#FFD3B6',
    '브루트 포스': '#D3D3D3'
};

export interface BoxProps {
    title: string;
    algorithmType: string;
    imgSrc: string;
    gifSrc: string;
    tags: string[];
    link: string;
    description: string;
}

export const boxes: BoxProps[] = [
    {
        title: '스택',
        algorithmType: '자료구조',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/stack.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/stack.gif`,
        tags: ['자료구조', '후입선출'],
        link: 'stack',
        description: '스택에 대한 설명',
    },
    {
        title: '선택정렬',
        algorithmType: '정렬',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/selection-sort.gif`,
        tags: ['정렬', '배열'],
        link: 'selection-sort',
        description: '선택정렬에 대한 설명',
    },
    {
        title: 'BFS',
        algorithmType: '그래프',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/bfs.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/bfs.gif`,
        tags: ['그래프', '탐색', '큐'],
        link: 'bfs',
        description: 'BFS에 대한 설명',
    },
];