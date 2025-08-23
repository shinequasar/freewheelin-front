import type { Problem } from '../../api/apiType'
import { convertLevelToDifficulty } from '../../util/convertLevelToDifficulty'
import SimilarQuestionCard from '../common/SimilarQuestionCard'

function SimilarQuestionList({ similarProblems }: { similarProblems: Problem[] }) {
  return (
    <div className="mr-[16px] flex w-[480px] flex-col items-center justify-center rounded-[16px] bg-bgColor-secondary p-[16px] desktop:w-[504px]">
      {similarProblems.length === 0 ? (
        <p className="mb-4 text-center text-[14px] font-[400] leading-[21px] tracking-[-0.2%] text-textColor-title">
          <span className="mb-[2px] mr-[6px] inline-flex h-[24px] w-[57px] items-center gap-[1px] rounded-[2px] border-[0.6px] bg-white p-[6px] text-[9px] text-textColor-label">
            <img src="/icons/add-circle-icon.png" alt="icon" className="h-[8px] w-[8px]" />
            유사문제
          </span>
          버튼을 누르면 <br /> 문제를 추가 또는 교체할 수 있습니다.
        </p>
      ) : (
        <div className="max-h-[calc(100vh-64px)] w-full space-y-0 overflow-y-auto scrollbar-hide">
          <h1 className="mb-4 text-[16px] font-[700] text-textColor-title">유사 문항</h1>
          {similarProblems.map((problem, index) => (
            <SimilarQuestionCard
              key={problem.id}
              number={index + 1}
              title={problem.title}
              imageUrl={problem.problemImageUrl}
              questionCode={problem.id}
              difficulty={convertLevelToDifficulty(problem.level)}
              percentage={problem.answerRate}
              type={problem.type === 1 ? '객관식' : '주관식'}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SimilarQuestionList
