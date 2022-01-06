export const SET_SUPPORT_TAB = 'support/setSupportTab';
export const SHOW_TICKET_SUBMISSION_SUCCESS = 'support/showTicketSubmissionSuccess';
export const SHOW_TICKET_SUBMISSION_FAIL = 'support/showTicketSubmissionFail';

export type SupportReduxState = {
  tabIndex: number;
  ticketSubmitStatus: {
    submitted: boolean;
    success: boolean;
    ticketId: string | null;
    messageId: string;
  };
};

export type SupportReduxAction =
  | { type: typeof SET_SUPPORT_TAB; payload: { tabIndex: number } }
  | {
      type: typeof SHOW_TICKET_SUBMISSION_SUCCESS | typeof SHOW_TICKET_SUBMISSION_FAIL;
      payload: { success: boolean; ticketId: string | null };
    };
