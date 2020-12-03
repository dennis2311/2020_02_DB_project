# 2020_02_DB_project

### 개발 명세 (TODO)

1. 제출자 기능 (/submittee)

   1. 태스크 참여 신청(/submittee/tasklist)

      - [x] 제출자가 원하는 태스크에 참가하기 위해서는 태스크 참가신청이 필요하다.
      - [x] 참가 신청 전에는 개인정보 이용동의서에 확인하는 절차가 필요하다
      - [x] 개인정보 이용동의서에 동의 후 해당 태스크에 참여신청 할 수 있다.
      - [ ] 참여 신청 후 관리자에 의해 참여 승인이 될 경우 태스크에 데이터 제출이 가능하다.

   1. 원본 데이터 시퀀스 파일 제출

      - [ ] 제출자는 관리자에 의해 참여 승인이 떨어진 태스크들의 목록을 볼 수 있다.
      - [ ] 제출자가 태스크에서 제출하기 버튼 등을 통해 원본 데이터 시퀀스 파일을 제출할 수 있다.
      - [ ] 원본 데이터 시퀀스 파일은 최소한 CSV 파일을 지원하여야 한다.
      - [ ] 제출자는 원본 데이터 시퀀스 파일을 첨부한 후, 원본 데이터 타입을 설정하고, 회차와 기간을 입력하여야 한다.
      - [ ] 원본 데이터 시퀀스 파일이 제출될 때 시스템은 자동으로 파일을 읽어 파싱하며 아래 정량 평가 항목들이 측정하고, 파싱 데이터 시퀀스 파일로 변환 후 저장한다. 또한 동시에 평가자가 랜덤으로 배정된다.
      - [ ] 전체 튜플 수, 중복 튜플 수, 컬럼 별 NULL 비율

   1. 제출 현황 모니터링 및 평가 점수 확인

      - [ ] 제출자는 자신이 참여중인 태스크의 현황 모니터링 할 수 있어야 하며, 자신의 현재 평가 점수를 확인할 수 있어야 한다.
      - [ ] 각 태스크 별로 전체 자신이 제출한 파일 수와 pass되어 태스크 데이터 테이블에 저장된 tuple수를 보여주어야 한다.
      - [ ] 각 태스크 내에서도 원본 데이터 타입 별로 자신이 제출한 파일들의 현황을 볼 수 있어야 한다. 각 원본 데이터 타입에 대하여 저장된 파싱 데이터 시퀀스 파일들의 현황을 회차 순으로 보여주어야 하며 각 파일들은 저장 PASS/NONPASS 상태를 보여져야 한다.

1. 평가자 기능 (/assessor)

   1. 파싱 데이터 시퀀스 파일 평가

      - [ ] 평가자는 시스템이 자신에게 할당하여 준 파싱 데이터 시퀀스 파일을 평가해야한다.
      - [ ] 평가자는 파싱 데이터 시퀀스 파일을 직접열어 데이터의 정성적인 품질을 판단하고, 10점 평가 scale로 평가 품질 점수를 메긴다. 또한 동시에 이 파일을 태스크 데이터 테이블에 저장 가능한지 여부를 판단하여 Pass 혹은 non Pass 판정을 내려야 한다.( pass가 저장 / non-pass가 저장하지 않음을 뜻한다.)

   1. 평가 내역 모니터링

      - [ ] 평가자는 자신이 지금까지 평가한 파싱 데이터 시퀀스 파일들의 기록을 볼 수 있다.
      - [ ] 과거 기록은 볼 수 만 있고 평가기록 수정이나 삭제는 불가능하다.

   1. 제출자의 평가 점수 관리기능

      - [ ] 제출된 파싱 데이터 시퀀스 파일들에 대해서는 정성&정량 평가가 이루어져야 한다.
      - [ ] 정량 평가 지표는 원본 데이터 시퀀스 파일이 제출될 시 시스템에서 자동적으로 파싱하여 계산해주는 총 튜플 수, 중복 튜플 수, 컬럼 별 널 컬럼 비율을 의미한다.
      - [ ] 정성 평가 지표는 평가자가 직접 데이터를 열어보고 평가자의 판단하에 메겨주는 데이터의 품질 점수를 의미한다.
      - [ ] 시스템은 각 제출자에 대하여 해당 제출자가 제출한 모든 파싱 데이터 시퀀스 파일들의 정성&정량 평가 결과를 활용하여 해당 제출자의 평가 점수를 계산하여 주어야한다. 이 때 평가 점수의 계산 방법은 제한을 두지 않는다.

1. 관리자 기능 (/admin)

   1. 태스크 생성 (/admin/taskcreate)

      - [x] 관리자는 새로운 태스크를 생성할 수 있다.
      - [ ] 이때 태스크의 기본 정보들 태스크 이름, 태스크 설명, 최소업로드 주기, 태스크 데이터 테이블 이름, 태스크 데이터 테이블 스키마를 모두 입력하여야한다.
      - [ ] 태스크가 새롭게 생성될 때 태스크 데이터 테이블 이름과 태스크 데이터 테이블 스키마는 자동 파싱되어 새로운 테이블도 자동 생성된다.
      - [ ] 또한 태스크에서 수집하고자 하는 원본 데이터 타입을 정의해두어야 한다. 각 원본 데이터 타입의 스키마 정보를 입력하고 해당 스키마가 태스크 데이터 테이블의 스키마와 어떻게 매핑 되는지에 대한 정보를 추가할 수 있어야 한다.

   2. 태스크 관리 (/admin/taskmanage)

      - [x] 제출자가 태스크에 참여하기 위해서는 태스크 참여 신청한 뒤 관리자의 승인을 기다려야 한다. 관리자는 각 태스크의 참여신청자 명단을 확인할 수 있어야 하고, 각 제출자들의 평가 점수를 기준으로 참여 여부를 판단하고 승인 및 거절이 가능하여야 한다.
      - [ ] 관리자는 또한 태스크에 새로운 원본 데이터 타입을 추가 할 수 있다. 이는 태스크 생성시 원본 데이터 타입을 설정 방법과 동일하다.
      - [ ] 관리자는 해당 태스트의 데이터에 대한 Pass 기준을 설정할 수 있어야 한다.

   3. 태스크 통계 (/admin/taskstatistics)

      - [ ] 관리자는 각 태스크 별로 전체 제출된 파일 수와 pass되어 태스크 데이터 테이블에 저장된 tuple 수를 확인할 수 있다. 또한 이를 원본 데이터 타입 수준에서도 볼 수 있다.
      - [ ] 또한 각 태스크에 참여중인 제출자들의 목록을 살펴 볼 수 있다. 이때 제출자를 개별 선택하면 각 제출자가 참여중인 태스크 등을 확인할 수 있다.

   4. 회원 관리 및 통계 (/admin/membermanage)
      - [x] 관리자는 현재 가입중인 모든 회원들의 리스트를 볼 수 있다.
      - [ ] 역할, 나이대, 성별, 참여중인 태스크, ID 를 기준으로 검색 가능하다.
      - [x] 검색 결과로 나온 각 회원을 클릭할 시 상세한 정보를 확인할 수 있다.
      - [ ] 회원이 제출자인 경우 해당 해원이 참여중인 태스크와 그 태스크에 참여한 통계정보를 볼 수 있다.
      - [ ] 회원이 평가자인 경우 해당 회원이 평가한 파싱 데이터 시퀀스 파일의 목록을 모두 볼 수 있다.

1. 회원가입 및 인증 기능 (/common)
   - [x] 사용자들이 본 사이트를 이용하기 위해서는 회원가입 후 로그인이 필요하다. 이를 위하여 본 사이트는 회원가입 기능 및 사용자 인증 기능을 갖추어야 한다.
   - [x] 사이트에는 관리자를 위한 “관리자 계정”이 사전 생성되어 있으며 본 계정의 역할은 ‘관리자’로 고정되어 있다. 관리자 계정으로 로그인 인증되면 관리자 UI가 제공되어야 한다. 디폴트 ID 및 password는 admin/admin으로 한다.
   - [x] 관리자 UI에서는 관리자 비밀번호 변경이 가능하여야 한다.
   - [x] 일반 사용자는 아이디, 패스워드, 이름, 성별, 주소, 생년월일, 휴대전화 등의 기본 정보를 입력한 후 평가자 혹은 제출자중 하나의 역할을 선택하여야 한다. 역할은 이후에 변경 불가능하다.
   - [x] 로그인 인증된 사용자가 제출자일 경우 제출자를 위한 UI가 제공되어야 한다.
   - [x] 로그인 인증된 사용자가 평가자일 경우 평가자를 위한 UI가 제공되어야 한다.
   - [ ] 모든 사용자는 로그인 후 자신의 기본 신상정보 및 비밀번호 변경이 가능하여야 한다.
   - [ ] 또한 모든 일반 사용자는 회원 탈퇴 가능하여야 한다.
