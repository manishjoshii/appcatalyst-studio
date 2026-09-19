export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  name: string;
  password?: string;
}

export interface UserProfileResponse {
  id: number;
  username: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfileResponse;
}

export type LoginResponse = AuthResponse;

export interface FileNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileNode[];
}

export interface FileTreeResponse {
  files: { path: string }[];
}

export interface FileContentResponse {
  path: string;
  content: string;
}

export interface DeployResponse {
  previewUrl: string;
}

export type ProjectRole = 'OWNER' | 'EDITOR' | 'VIEWER';

export interface ProjectRequest {
  name: string;
}

export interface ProjectResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt?: string;
  owner?: UserProfileResponse;
  role?: ProjectRole;
}

export interface ProjectSummaryResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt?: string;
  role?: ProjectRole;
  description?: string;
  thumbnailUrl?: string;
}

export interface ProjectMember {
  userId: number;
  username: string;
  name?: string;
  role: ProjectRole;
  invitedAt?: string;
}

export type MemberResponse = ProjectMember;

export interface InviteMemberRequest {
  username: string;
  role: ProjectRole;
}

export interface UpdateMemberRoleRequest {
  role: ProjectRole;
}

export interface UsageTodayResponse {
  tokensUsed: number;
  tokensLimit: number;
  previewsRunning: number;
  previewsLimit: number;
}

export interface PlanResponse {
  id: number;
  name: string;
  maxProjects: number;
  maxTokensPerDay: number;
  unlimitedAi: boolean;
  price: string;
}

export interface SubscriptionResponse {
  plan?: PlanResponse;
  status?: string;
  currentPeriodEnd?: string;
  tokensUsedThisCycle?: number;
}

export interface CheckoutRequest {
  planId: number;
}

export interface CheckoutResponse {
  checkoutUrl: string;
}

export interface PortalResponse {
  portalUrl: string;
}

export enum ChatEventType {
  THOUGHT = 'THOUGHT',
  MESSAGE = 'MESSAGE',
  FILE_EDIT = 'FILE_EDIT',
  TOOL_LOG = 'TOOL_LOG'
}

export interface ChatEvent {
  id?: number;
  type: ChatEventType;
  sequenceOrder?: number;
  content: string;
  filePath?: string;
  metadata?: string;
}

export interface ChatEventResponse {
  id?: number;
  type: 'THOUGHT' | 'MESSAGE' | 'FILE_EDIT' | 'TOOL_LOG';
  sequenceOrder?: number;
  content?: string;
  filePath?: string;
  metadata?: string;
}

export interface ChatRequest {
  message: string;
  projectId: number;
}

export interface ChatResponse {
  id: number;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM' | 'TOOL';
  events?: ChatEvent[];
  content?: string;
  tokensUsed?: number;
  createdAt?: string;
}

export interface ChatMessage {
  id: number | string;
  role: 'user' | 'assistant' | 'USER' | 'ASSISTANT';
  content?: string;
  events?: ChatEvent[];
  isStreaming?: boolean;
  createdAt?: string;
  editedFiles?: string[];
}