import { useQuestionStore } from '../../store/questionStore'
import type { CardProps } from '../../types/questionType'

const QuestionCard = ({
  number,
  title,
  imageUrl,
  difficulty,
  percentage,
  type,
  questionCode,
}: CardProps) => {
  const difficultyText = {
    easy: '하',
    easyMedium: '중하',
    medium: '중',
    mediumHard: '상',
    hard: '최상',
  }

  const difficultyColor = {
    easy: 'text-difficulty-easy',
    easyMedium: 'text-difficulty-easyMedium',
    medium: 'text-difficulty-medium',
    mediumHard: 'text-difficulty-mediumHard',
    hard: 'text-difficulty-hard',
  }
  const { setActiveQuestionId } = useQuestionStore()

  return (
    <div className="pb-[16px]">
      {/* 헤더 영역 */}
      <div
        data-area="header"
        className="flex items-start justify-between rounded-t-[12px] bg-cardColor-header px-[16px] pb-[15px] pt-[16px]"
      >
        <div data-area="content" className="flex items-center">
          <span
            data-area="number"
            className="ml-[12px] mr-[32px] mt-[4px] text-[20px] font-bold text-textColor-title"
          >
            {number}
          </span>
          <div data-area="title" className="flex-1">
            <h3 className="text-[14px] font-[400] leading-[21px] tracking-[-0.2%] text-textColor-title">
              <span className="tablet:hidden">
                {title.length > 18 ? `${title.slice(0, 18)}...` : title}
              </span>
              <span className="hidden tablet:block">
                {title.length > 42 ? `${title.slice(0, 42)}...` : title}
              </span>
            </h3>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div data-area="actions" className="flex items-center gap-3">
          <button
            data-area="btn-add"
            className="flex items-center gap-1 text-[12px] text-textColor-label hover:text-focus"
            onClick={() => {
              console.log('clicked', questionCode)
              setActiveQuestionId(questionCode)
            }}
          >
            <img src="/icons/add-circle-icon.png" alt="add" className="h-[16px] w-[16px]" />
            유사문제
          </button>
          <button
            data-area="btn-delete"
            className="flex items-center gap-1 text-[12px] text-textColor-label hover:text-delete"
          >
            <img src="/icons/delete-icon.png" alt="delete" className="h-[16px] w-[16px]" />
            삭제
          </button>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
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
            className={`${difficultyColor[difficulty]} w-[40px] rounded-[4px] bg-cardColor-label px-2 py-1 text-center text-[12px] font-[400] leading-[18px]`}
          >
            {difficultyText[difficulty]}
          </span>
          <span
            data-area="label-percentage"
            className="w-[40px] rounded-[4px] bg-cardColor-label text-center text-[12px] font-[400] leading-[18px] text-textColor-percentage"
          >
            {percentage}%
          </span>
          <span
            data-area="label-type"
            className="w-[40px] rounded-[4px] bg-cardColor-label text-center text-[12px] font-[400] leading-[18px] text-textColor-label"
          >
            {type}
          </span>
        </div>
        <div data-area="placeholder" className="max-w-[70%] pb-[24px]">
          <img src={imageUrl} alt="problem" className="h-full w-full object-contain" />
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
