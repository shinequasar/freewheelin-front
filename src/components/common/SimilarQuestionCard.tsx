import { useQuestionStore } from '../../store/questionStore'
import type { SimilarQuestionCardProps } from '../../types/questionType'
import { difficultyColor, difficultyText } from '../../util/convertToDifficulty'

const SimilarQuestionCard = ({ problem, number }: SimilarQuestionCardProps) => {
  const { activeQuestionId, addProblem, replaceProblem } = useQuestionStore()

  const handleAddClick = () => {
    if (activeQuestionId && activeQuestionId !== -1) {
      addProblem(problem, activeQuestionId)
    }
  }

  const handleReplaceClick = () => {
    if (activeQuestionId && activeQuestionId !== -1) {
      console.log('=교체 : ', activeQuestionId)
      replaceProblem(problem, activeQuestionId)
    }
  }

  return (
    <div className="pb-[16px]">
      <div
        data-area="header"
        className="flex h-[44px] items-center justify-between rounded-t-[12px] bg-cardColor-header px-[16px]"
      >
        <div data-area="content" className="flex items-center">
          <span
            data-area="number"
            className="ml-[12px] mr-[32px] text-[20px] font-bold text-textColor-title"
          >
            {number}
          </span>
          <div data-area="title" className="flex-1">
            <h3 className="text-[14px] font-[400] leading-[21px] tracking-[-0.2%] text-textColor-title">
              <span className="desktop:hidden">
                {problem.title.length > 22 ? `${problem.title.slice(0, 22)}...` : problem.title}
              </span>
              <span className="hidden desktop:block">
                {problem.title.length > 24 ? `${problem.title.slice(0, 24)}...` : problem.title}
              </span>
            </h3>
          </div>
        </div>

        <div data-area="actions" className="flex items-center gap-3">
          <button
            data-area="btn-add"
            className="flex items-center gap-1 text-[12px] text-textColor-label hover:text-edit"
            onClick={handleReplaceClick}
          >
            <img src="/icons/swap-icon.png" alt="add" className="h-[16px] w-[16px]" />
            교체
          </button>
          <button
            data-area="btn-delete"
            className="flex items-center gap-1 text-[12px] text-textColor-label hover:text-add"
            onClick={handleAddClick}
          >
            <img src="/icons/add-circle-icon.png" alt="delete" className="h-[16px] w-[16px]" />
            추가
          </button>
        </div>
      </div>

      <div
        data-area="content-area"
        className="relative flex min-h-32 items-center justify-center rounded-b-[12px] bg-cardColor-body p-4"
      >
        <div
          data-area="labels"
          className="absolute left-[16px] top-[16px] flex flex-col items-center gap-2"
        >
          <span
            data-area="label-difficulty"
            className={`${difficultyColor[problem.level]} w-[40px] rounded-[4px] bg-cardColor-label px-2 py-1 text-center text-[12px] font-[400] leading-[18px]`}
          >
            {difficultyText[problem.level]}
          </span>
          <span
            data-area="label-percentage"
            className="w-[40px] rounded-[4px] bg-cardColor-label text-center text-[12px] font-[400] leading-[18px] text-textColor-percentage"
          >
            {problem.answerRate}%
          </span>
          <span
            data-area="label-type"
            className="w-[40px] rounded-[4px] bg-cardColor-label text-center text-[12px] font-[400] leading-[18px] text-textColor-label"
          >
            {problem.type === 1 ? '객관식' : '주관식'}
          </span>
        </div>
        <div data-area="placeholder" className="max-w-[70%] pb-[24px]">
          <img
            src={problem.problemImageUrl}
            alt="problem"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default SimilarQuestionCard
