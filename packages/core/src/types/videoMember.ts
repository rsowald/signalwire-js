import { PRODUCT_PREFIX_VIDEO } from '../utils/constants'
import { toExternalJSON } from '../utils'
import type { SwEvent } from '.'
import type {
  CamelToSnakeCase,
  SnakeToCamelCase,
  EntityUpdated,
  ToInternalVideoEvent,
} from './utils'

/**
 * Used to not duplicate member fields across constants and types
 * and generate `MEMBER_UPDATED_EVENTS` below.
 * `key`: `type`
 */
export const INTERNAL_MEMBER_UPDATABLE_PROPS = {
  audio_muted: true,
  video_muted: true,
  deaf: true,
  on_hold: true,
  visible: true,
  input_volume: 1,
  output_volume: 1,
  input_sensitivity: 1,
}
export type InternalVideoMemberUpdatableProps =
  typeof INTERNAL_MEMBER_UPDATABLE_PROPS

export const INTERNAL_MEMBER_UPDATED_EVENTS = Object.keys(
  INTERNAL_MEMBER_UPDATABLE_PROPS
).map((key) => {
  return `${PRODUCT_PREFIX_VIDEO}.member.updated.${
    key as keyof InternalVideoMemberUpdatableProps
  }` as const
})

export type VideoMemberUpdatableProps = {
  [K in keyof InternalVideoMemberUpdatableProps as SnakeToCamelCase<K>]: InternalVideoMemberUpdatableProps[K]
}

// @ts-expect-error
export const MEMBER_UPDATABLE_PROPS: VideoMemberUpdatableProps = toExternalJSON(
  INTERNAL_MEMBER_UPDATABLE_PROPS
)

export const MEMBER_UPDATED_EVENTS = Object.keys(MEMBER_UPDATABLE_PROPS).map(
  (key) => {
    return `member.updated.${key as keyof VideoMemberUpdatableProps}` as const
  }
)

/**
 * Public event types
 */
export type MemberJoined = 'member.joined'
export type MemberLeft = 'member.left'
export type MemberUpdated = 'member.updated'
export type MemberTalking = 'member.talking'

// Generated by the SDK

/**
 * See {@link MEMBER_UPDATED_EVENTS} for the full list of events.
 */
export type MemberUpdatedEventNames = typeof MEMBER_UPDATED_EVENTS[number]
export type MemberTalkingStarted = 'member.talking.started'
export type MemberTalkingEnded = 'member.talking.ended'
/**
 * Use `member.talking.started` instead
 * @deprecated
 */
export type MemberTalkingStart = 'member.talking.start'
/**
 * Use `member.talking.ended` instead
 * @deprecated
 */
export type MemberTalkingStop = 'member.talking.stop'

export type MemberTalkingEventNames =
  | MemberTalking
  | MemberTalkingStarted
  | MemberTalkingEnded
  | MemberTalkingStart
  | MemberTalkingStop

/**
 * List of public events
 */
export type VideoMemberEventNames =
  | MemberJoined
  | MemberLeft
  | MemberUpdated
  | MemberUpdatedEventNames
  | MemberTalkingEventNames

/**
 * List of internal events
 * @internal
 */
export type InternalVideoMemberEventNames =
  | ToInternalVideoEvent<
      MemberJoined | MemberLeft | MemberUpdated | MemberTalkingEventNames
    >
  | typeof INTERNAL_MEMBER_UPDATED_EVENTS[number]

/**
 * Base Interface for a VideoMember entity
 */
export type VideoMemberType = 'member' | 'screen' | 'device'
export interface VideoMemberBase {
  id: string
  roomId: string
  roomSessionId: string
  name: string
  parentId?: string
  type: VideoMemberType
}

export interface VideoMember
  extends VideoMemberBase,
    VideoMemberUpdatableProps {}
/**
 * VideoMember entity plus `updated` field
 */
export type VideoMemberUpdated = EntityUpdated<VideoMember>

/**
 * VideoMember entity for internal usage (converted to snake_case)
 * @internal
 */
export type InternalVideoMember = {
  [K in keyof VideoMember as CamelToSnakeCase<K>]: VideoMember[K]
}

/**
 * VideoMember entity plus `updated` field
 * for internal usage (converted to snake_case)
 * @internal
 */
export type InternalVideoMemberUpdated = EntityUpdated<InternalVideoMember>

/**
 * ==========
 * ==========
 * Server-Side Events
 * ==========
 * ==========
 */

/**
 * 'video.member.joined'
 */
export interface VideoMemberJoinedEventParams {
  room_session_id: string
  room_id: string
  member: InternalVideoMember
}

export interface VideoMemberJoinedEvent extends SwEvent {
  event_type: ToInternalVideoEvent<MemberJoined>
  params: VideoMemberJoinedEventParams
}

/**
 * 'video.member.updated'
 */
export interface VideoMemberUpdatedEventParams {
  room_session_id: string
  room_id: string
  member: InternalVideoMemberUpdated
}

export interface VideoMemberUpdatedEvent extends SwEvent {
  event_type: ToInternalVideoEvent<MemberUpdated>
  params: VideoMemberUpdatedEventParams
}

/**
 * 'video.member.left'
 */
export interface VideoMemberLeftEventParams {
  room_session_id: string
  room_id: string
  // TODO: check if we have full object here
  member: InternalVideoMember
}

export interface VideoMemberLeftEvent extends SwEvent {
  event_type: ToInternalVideoEvent<MemberLeft>
  params: VideoMemberLeftEventParams
}

/**
 * 'video.member.talking'
 */
export interface VideoMemberTalkingEventParams {
  room_session_id: string
  room_id: string
  member: Pick<InternalVideoMember, 'id'> & {
    talking: boolean
  }
}

export interface VideoMemberTalkingEvent extends SwEvent {
  event_type: ToInternalVideoEvent<MemberTalking>
  params: VideoMemberTalkingEventParams
}

export type VideoMemberEvent =
  | VideoMemberJoinedEvent
  | VideoMemberLeftEvent
  | VideoMemberUpdatedEvent
  | VideoMemberTalkingEvent

export type VideoMemberEventParams =
  | VideoMemberJoinedEventParams
  | VideoMemberLeftEventParams
  | VideoMemberUpdatedEventParams
  | VideoMemberTalkingEventParams
