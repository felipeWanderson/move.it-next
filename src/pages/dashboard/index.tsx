import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Challenges from '../../components/Pages/Challenges'
import Leaderboard from '../../components/Pages/LeaderBoard';
import Sidebar from '../../components/Sidebar';

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,  
}
export default function Dashboard({
  level, 
  currentExperience, 
  challengesCompleted
}: HomeProps) {
  const [page, setPage] = useState('challenges'); 
  return (
    
    <div>
      <Sidebar setPage={setPage}/>
      {page === 'challenges' && (
        <Challenges 
          level={level}
          challengesCompleted={challengesCompleted}
          currentExperience={currentExperience}
        />
      )}
      {page === 'leaderboard' && <Leaderboard /> }
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}

