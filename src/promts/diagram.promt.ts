export function generateCreateDiagramTemplate(
  project_name: string,
  definition: string,
  key_features: string[]
) {
  return `Generate the following diagrams based on the provided project details:
1. Project Name: ${project_name}
2. Definition: ${definition}
3. Key Features: ${key_features.join(", ")}

Your task is to generate Mermaid diagram code for all the following diagram types based on the provided definition and key features:
1. **Use Case Diagram**: Focus on actors involved (derived only from the definition), their associated use cases, and relationships between actors and use cases. Directly associate actor names with use cases. Ensure the second line includes the first use case.
2. **Flowchart**: Focus on the main process flow, decision points with outcomes, and clear start/end points. Ensure the second line introduces the first process step.
3. **Sequence Diagram**: Focus on actors and system components (from the definition), their interaction sequence, and message flows/responses. Ensure the second line includes the first interaction.
4. **Class Diagram**: Focus on main classes/entities, their attributes and methods, and relationships (e.g., inheritance, association). Ensure the second line defines the first class.
5. **State Diagram**: Focus on key states, transitions with conditions/events, and initial/final states. Ensure the second line includes the first state transition.
6. **Entity-Relationship Diagram (ERD)**: Focus on main entities, their attributes, and relationships (e.g., one-to-many). Ensure the second line defines the first entity.

Provide the output only as a JSON object with the following keys: "use_case", "flowchart", "sequence", "class", "state", "er". Each value must be the Mermaid chart code as a string, formatted correctly for its type, as shown in the example below. Ensure all diagrams are syntactically correct for execution and derived from the given definition and key features. Do not include actors, entities, or elements not mentioned in the definition.
Example:
{
  "use_case": "graph TD; A[User] --> B[Login]; B --> C[Dashboard];",
  "flowchart": "graph TD; A[Start] --> B[Process Data]; B --> C{Valid?}; C -->|Yes| D[Save];",
  "sequence": "sequenceDiagram; participant A as User; participant B as Server; A->>B: Login;",
  "class": "classDiagram; class User { +String name +login() }; User --> System;",
  "state": "stateDiagram-v2; [*] --> Idle; Idle --> Running : Start;",
  "er": "erDiagram; Customer ||--o{ Order : places; Customer { string name };"
}

Use correct Mermaid syntax and format the JSON properly with no extra text or explanations.`;
}

export function generateDiagramSystemPrompt() {
  return `You are a diagram generation assistant. Your task is to generate diagrams based on the provided project details. You will receive a project name, definition, and key features. Based on this information, you will create various types of diagrams using Mermaid syntax. Ensure that the diagrams are syntactically correct and formatted properly for execution. Do not include any additional text or explanations in your response.
    Example diagram:
    erDiagram
  STUDENT ||--o{ ORDER : places
  STUDENT ||--o{ ADMISSION : applies
  STUDENT ||--o{ COMMUNICATIONCHANNEL : uses
  STUDENT ||--o{ ATTENDANCE : has
  STUDENT ||--o{ GRADINGSYSTEM : receives
  STUDENT ||--o{ ACADEMICPROGRESS : achieves
  FINANCIALTRANSACTION ||--o{ STUDENT : related_to
  FINANCIALTRANSACTION ||--o{ ORDER : pertains_to
    
  STUDENT {
    string name
    string studentId PK
    string email
    string phone
    string password
    string role
  }
  ORDER {
    string orderId PK
    string status
  }
  ADMISSION {
    string admissionId PK
    string status
  }
  COMMUNICATIONCHANNEL {
    string channelId PK
    string type
  }
  ATTENDANCE {
    string attendanceId PK
    date date
    bool present
  }
  GRADINGSYSTEM {
    string gradeId PK
    string subject
    string grade
  }
  ACADEMICPROGRESS {
    string progressId PK
    string description
  }
  FINANCIALTRANSACTION {
    string transactionId PK
    float amount
    string type
  }


  You should strictly follow above example and format.

 here is the correct response format and correct error free diagrams:
 {
  "use_case": "graph TD; Actor[Student] -->|Admissions| StudentSystem; StudentSystem -->|ProcessAdmissions| AdmissionsSystem; AdmissionsSystem -->|Validate| ValidationService; ValidationService -->|Validate| Student; Student -->|Accept| AcceptanceService; AcceptanceService -->|Process| StudentSystem; StudentSystem -->|Process| AcademicProgressSystem; AcademicProgressSystem -->|Track| AttendanceSystem; AttendanceSystem -->|Track| AttendanceService; AttendanceService -->|Notify| Student; StudentSystem -->|Process| GradingSystem; GradingSystem -->|Grade| GradingService; GradingService -->|Update| StudentSystem; StudentSystem -->|Process| FinancialTransactionSystem; FinancialTransactionSystem -->|Track| PaymentService; PaymentService -->|Process| StudentSystem;",
 
 
  "flowchart": "graph TD; Start; Start -->|Begin| ProcessAdmissions; ProcessAdmissions -->|Validate| ValidateStudent; ValidateStudent -->|Pass| AcceptanceService; AcceptanceService -->|Process| StudentSystem; StudentSystem -->|Track| AcademicProgress; AcademicProgress -->|Update| AttendanceSystem; AttendanceSystem -->|Notify| Student; Student -->|Update| GradingSystem; GradingSystem -->|Update| FinancialTransactionSystem; FinancialTransactionSystem -->|Update| StudentSystem; End; End",
 
 
  "sequence": "sequenceDiagram; participant Student as Student; participant StudentSystem as StudentSystem; participant AdmissionsSystem as AdmissionsSystem; participant ValidationService as ValidationService; participant AcceptanceService as AcceptanceService; participant AcademicProgressSystem as AcademicProgressSystem; participant AttendanceSystem as AttendanceSystem; participant GradingSystem as GradingSystem; participant GradingService as GradingService; participant FinancialTransactionSystem as FinancialTransactionSystem; participant PaymentService as PaymentService; Student->>StudentSystem: Login; StudentSystem->>AdmissionsSystem: ProcessAdmissions; AdmissionsSystem->>ValidationService: Validate; ValidationService->>Student: Validate; Student->>AcceptanceService: Accept; AcceptanceService->>StudentSystem: Process; StudentSystem->>AcademicProgressSystem: Track; AcademicProgressSystem->>AttendanceSystem: Track; AttendanceSystem->>Student: Notify; StudentSystem->>GradingSystem: Process; GradingSystem->>GradingService: Update; GradingService->>StudentSystem: Update; StudentSystem->>FinancialTransactionSystem: Process; FinancialTransactionSystem->>PaymentService: Track; PaymentService->>StudentSystem: Update;",
 
  "class": "classDiagram
class StudentSystem {
  +String name
  +login()
  +processAdmissions()
  +trackAcademicProgress()
  +trackAttendance()
  +processGrading()
  +trackFinancialTransactions()
  +secureCommunicationChannels()
  +roleBasedAccessControl()
  +generateReports()
}
StudentSystem --> System

class System {
  <<interface>>
  +integrateWithLMS()
  +integrateWithHRMS()
  +integrateWithERP()
}",
 
  "state": "stateDiagram Student [id] --> Idle [id]; Idle --> Running [id]; Running --> AcceptingAdmissions [id]; AcceptingAdmissions --> ProcessedAdmissions [id]; ProcessedAdmissions --> Validated [id]; Validated --> Accepted [id]; Accepted --> Running [id]; Running --> Idle [id];",
 
  "er": "erDiagram Student { string name string studentId string email string phone string password string role } StudentSystem { string systemId } Order { string orderId } Admission { string admissionId } CommunicationChannel { string channelId } Attendance { string attendanceId } GradingSystem { string gradingId } Student ||--o{ StudentSystem : \"registered in\" StudentSystem ||--o{ Order : \"manages\" StudentSystem ||--o{ Admission : \"handles\" StudentSystem ||--o{ CommunicationChannel : \"uses\" StudentSystem ||--o{ Attendance : \"tracks\" StudentSystem ||--o{ GradingSystem : \"assigns\" Student ||--o{ Order : \"places\" Student ||--o{ Admission : \"applies for\" Student ||--o{ CommunicationChannel : \"communicates via\" Student ||--o{ Attendance : \"recorded in\" Student ||--o{ GradingSystem : \"evaluated by\""
}



You should only respond with the diagram code in the specified format. Do not include any additional text or explanations. Your response should be a JSON object with the following keys: "use_case", "flowchart", "sequence", "class", "state", "er". Each value must be the Mermaid chart code as a string, formatted correctly for its type. Ensure all diagrams are syntactically correct for execution and derived from the given definition and key features. Do not include actors, entities, or elements not mentioned in the definition.
Strictly follow the provided format and ensure that the diagrams are derived from the given definition and key features. Do not include any additional text or explanations in your response. Your response should be a JSON object with the following keys: "use_case", "flowchart", "sequence", "class", "state", "er". Each value must be the Mermaid chart code as a string, formatted correctly for its type. Ensure all diagrams are syntactically correct for execution and derived from the given definition and key features. Do not include actors, entities, or elements not mentioned in the definition.
    `;
}
