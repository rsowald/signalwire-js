import { configureJestStore } from '../testUtils'
import { BaseComponent } from '../BaseComponent'
import { EventEmitter } from '../utils/EventEmitter'
import { connect, SDKStore } from '../redux'
import * as CustomMethods from './methods'
import * as ReduxActions from '../redux/actions'

describe('Room Custom Methods', () => {
  let store: SDKStore
  let instance: any

  Object.defineProperties(BaseComponent.prototype, CustomMethods)

  beforeEach(() => {
    store = configureJestStore()
    instance = connect({
      store,
      componentListeners: {
        errors: 'onError',
        responses: 'onSuccess',
      },
      Component: BaseComponent,
    })({
      emitter: new EventEmitter(),
    })
    instance.execute = jest.fn()
    instance._attachListeners(instance.__uuid)
  })

  it('should have all the custom methods defined', () => {
    Object.keys(CustomMethods).forEach((method) => {
      expect(instance[method]).toBeDefined()
    })
  })

  describe('startRecording', () => {
    it('should return the raw payload w/o emitterTransforms', async () => {
      ;(instance.execute as jest.Mock).mockResolvedValueOnce({
        code: '200',
        message: 'Recording started',
        recording_id: 'c22d7223-5a01-49fe-8da0-46bec8e75e32',
      })
      instance.roomSessionId = 'mocked'

      const response = await instance.startRecording()
      expect(instance.execute).toHaveBeenCalledTimes(1)
      expect(instance.execute).toHaveBeenCalledWith({
        method: 'video.recording.start',
        params: {
          room_session_id: 'mocked',
        },
      })
      expect(response).toStrictEqual({
        code: '200',
        message: 'Recording started',
        recording_id: 'c22d7223-5a01-49fe-8da0-46bec8e75e32',
        room_session_id: 'mocked',
      })
    })
  })

  describe('setLayout', () => {
    it('should execute with proper params', async () => {
      ;(instance.execute as jest.Mock).mockResolvedValueOnce({})
      instance.roomSessionId = 'mocked'

      await instance.setLayout({
        positions: {
          'c22d7124-5a01-49fe-8da0-46bec8e75f12': 'reserved',
        },
      })
      expect(instance.execute).toHaveBeenCalledTimes(1)
      expect(instance.execute).toHaveBeenCalledWith(
        {
          method: 'video.set_layout',
          params: {
            room_session_id: 'mocked',
            positions: {
              'c22d7124-5a01-49fe-8da0-46bec8e75f12': 'reserved',
            },
          },
        },
        {
          transformResolve: expect.anything(),
        }
      )
    })
  })

  describe('setPositions', () => {
    it('should execute with proper params', async () => {
      ;(instance.execute as jest.Mock).mockResolvedValueOnce({})
      instance.roomSessionId = 'mocked'

      await instance.setPositions({
        positions: {
          'cebecb3a-b9e4-499c-a707-0af96c110a04': 'standard',
          'aaaaaaa-b9e4-499c-a707-0af96c110a04': 'standard-1',
        },
      })
      expect(instance.execute).toHaveBeenCalledTimes(1)
      expect(instance.execute).toHaveBeenCalledWith(
        {
          method: 'video.set_position',
          params: {
            room_session_id: 'mocked',
            positions: {
              'cebecb3a-b9e4-499c-a707-0af96c110a04': 'standard',
              'aaaaaaa-b9e4-499c-a707-0af96c110a04': 'standard-1',
            },
          },
        },
        {
          transformResolve: expect.anything(),
          transformParams: expect.anything(),
        }
      )
    })
  })

  describe('setRoles (setPositions alias)', () => {
    let executeActionMock: jest.SpyInstance;

    beforeEach(() => {
      executeActionMock = jest.spyOn(ReduxActions, 'executeAction')
    })

    afterEach(() => {
      executeActionMock.mockRestore()
    })

    it('should execute with proper params', async () => {
      const localInstance: any = connect({
        store,
        componentListeners: {
          errors: 'onError',
          responses: 'onSuccess',
        },
        Component: BaseComponent,
      })({
        emitter: new EventEmitter(),
      })
      localInstance._attachListeners(localInstance.__uuid)
      localInstance.roomSessionId = 'mocked'

      localInstance.setRoles({
        roles: {
          'cebecb3a-b9e4-499c-a707-0af96c110a04': 'standard',
          'aaaaaaa-b9e4-499c-a707-0af96c110a04': 'standard-1',
        },
      })

      expect(executeActionMock).toHaveBeenCalledWith({
        requestId: expect.anything(),
        componentId: expect.anything(),
        method: 'video.set_position',
        params: {
          positions: {
            'cebecb3a-b9e4-499c-a707-0af96c110a04': 'standard',
            'aaaaaaa-b9e4-499c-a707-0af96c110a04': 'standard-1',
          },
          room_session_id: 'mocked',
        },
      })
    })
  })

  describe('setMemberPosition', () => {
    it('should execute with proper params', async () => {
      ;(instance.execute as jest.Mock).mockResolvedValueOnce({})
      instance.roomSessionId = 'mocked'

      await instance.setMemberPosition({
        member_id: 'cebecb3a-b9e4-499c-a707-0af96c110a04',
        position: 'standard',
      })
      expect(instance.execute).toHaveBeenCalledTimes(1)
      expect(instance.execute).toHaveBeenCalledWith(
        {
          method: 'video.member.set_position',
          params: {
            room_session_id: 'mocked',
            member_id: 'cebecb3a-b9e4-499c-a707-0af96c110a04',
            position: 'standard',
          },
        },
        {
          transformResolve: expect.anything(),
          transformParams: expect.anything(),
        }
      )
    })
  })

  describe('setMemberRole (setMemberPosition alias)', () => {
    let executeActionMock: jest.SpyInstance;

    beforeEach(() => {
      executeActionMock = jest.spyOn(ReduxActions, 'executeAction')
    })

    afterEach(() => {
      executeActionMock.mockRestore()
    })

    it('should execute with proper params', async () => {
      const localInstance: any = connect({
        store,
        componentListeners: {
          errors: 'onError',
          responses: 'onSuccess',
        },
        Component: BaseComponent,
      })({
        emitter: new EventEmitter(),
      })
      localInstance._attachListeners(localInstance.__uuid)
      localInstance.roomSessionId = 'mocked'

      localInstance.setMemberRole({
        memberId: 'member-id',
        role: 'standard',
      })

      expect(executeActionMock).toHaveBeenCalledWith({
        requestId: expect.anything(),
        componentId: expect.anything(),
        method: 'video.member.set_position',
        params: {
          member_id: 'member-id',
          position: 'standard',
          room_session_id: 'mocked',
        },
      })
    })
  })

  describe('play', () => {
    it('should execute with proper params', async () => {
      ;(instance.execute as jest.Mock).mockResolvedValueOnce({})
      instance.roomSessionId = 'mocked'

      await instance.play({
        positions: {
          'c22d7124-5a01-49fe-8da0-46bec8e75f12': 'reserved',
        },
      })
      expect(instance.execute).toHaveBeenCalledTimes(1)
      expect(instance.execute).toHaveBeenCalledWith({
        method: 'video.playback.start',
        params: {
          room_session_id: 'mocked',
          positions: {
            'c22d7124-5a01-49fe-8da0-46bec8e75f12': 'reserved',
          },
        },
      })
    })
  })
})
