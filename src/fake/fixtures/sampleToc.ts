import { IQueryResult } from '../../RocBase';

const data: IQueryResult[] = [
  {
    id: 'aaa5f97c7cde94741de2938b105a97c4',
    key: ['anonymousRead', '10-90-2 '],
    value: {
      hasNmr: 1,
      has1d: true,
      has2d: false,
      nb1d: 1,
      nb2d: 0,
      nb1h: 1,
      nb13c: 0,
      modificationDate: 1479735881852,
      b64ShortId: 'qqX5fHze',
      names: [],
      reference: '10-90-2 '
    },
    doc: {
      _id: 'aaa5f97c7cde94741de2938b105a97c4',
      _rev: '2-7f02ab68d0430249abf23aee8fa02ef9',
      $type: 'entry',
      $id: ['10-90-2', null],
      $kind: 'sample',
      $owners: ['sample@cheminfo.org', 'anonymousRead', 'sampleRW'],
      $content: {
        general: {},
        identifier: { cas: [{ value: '10-90-2' }] },
        physical: {},
        spectra: {
          nmr: [
            {
              dimension: 1,
              nucleus: ['1H'],
              isFid: false,
              isFt: true,
              title: '10-90-2 -',
              solvent: 'CDCl3',
              pulse: 'zg',
              experiment: '1d',
              temperature: 303,
              frequency: 400.112,
              type: 'NMR SPECTRUM',
              date: '2004-02-03T12:08:21.000Z',
              range: [
                {
                  from: 7.278150727338177,
                  to: 7.293204961898503,
                  integral: 0.5608078455161883,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 7.28567784461834
                    }
                  ]
                },
                {
                  from: 3.6774016163063687,
                  to: 3.743792156722481,
                  integral: 35.49955275645598,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'quint',
                      kind: '',
                      remark: '',
                      j: [
                        { coupling: 4.576492846887959, multiplicity: 'quint' }
                      ],
                      delta: 3.7105968865144248
                    }
                  ]
                },
                {
                  from: 2.3633781218254977,
                  to: 2.438972804082467,
                  integral: 34.968410246154875,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'quint',
                      kind: '',
                      remark: '',
                      j: [
                        { coupling: 4.267367262143466, multiplicity: 'quint' }
                      ],
                      delta: 2.4011754629539825
                    }
                  ]
                },
                {
                  from: 2.265052792310393,
                  to: 2.306503372560658,
                  integral: 5.665557412623038,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 2.2857780824355256
                    }
                  ]
                },
                {
                  from: 2.2550061188419503,
                  to: 2.312812274938926,
                  integral: 22.315572729348943,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'd',
                      kind: '',
                      remark: '',
                      j: [{ coupling: 8.015482114918314, multiplicity: 'd' }],
                      delta: 2.283909196890438
                    }
                  ]
                }
              ],
              jcamp: { filename: 'spectra/nmr/168.jdx' }
            }
          ]
        },
        misc: { externalID: 421 }
      },
      $lastModification: 'sample@cheminfo.org',
      $modificationDate: 1479735881852,
      $creationDate: 1479735881813,
      _attachments: {
        'spectra/nmr/168.jdx': {
          content_type: 'chemical/x-jcamp-dx',
          revpos: 1,
          digest: 'md5-4OLZEJfiE3GN7NRCRC3HeA==',
          length: 187769,
          stub: true
        }
      }
    }
  },
  {
    id: 'aaa5f97c7cde94741de2938b106656e6',
    key: ['anonymousRead', '100-00-5 '],
    value: {
      mf: 'C6H4NO2Cl',
      mw: 157.554629,
      ocl: {
        value: 'deVDaNFPbNf^RYWZf`@f@@',
        coordinates: '!Bb@JH_x@b@JH@ox@b@JH_x@'
      },
      nb1d: 0,
      nb2d: 0,
      nb1h: 0,
      nb13c: 0,
      modificationDate: 1479736117430,
      b64ShortId: 'qqX5fHze',
      names: [],
      reference: '100-00-5 '
    },
    doc: {
      _id: 'aaa5f97c7cde94741de2938b106656e6',
      _rev: '4-88a5afbcff4f8dbe2d5d68d7468b8f38',
      $type: 'entry',
      $id: ['100-00-5', null],
      $kind: 'sample',
      $owners: ['sample@cheminfo.org', 'anonymousRead', 'sampleRW'],
      $content: {
        general: {
          mf: 'C6H4NO2Cl',
          mw: 157.554629,
          em: 156.9930560563,
          molfile:
            '[N+](C1(=CC=C(C=C1)Cl))([O-])=O\n\n\n 10 10  0  0  0  0  0  0  0  0999 V2000\n    0.8660    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7320   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    1.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.5000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7320   -1.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5980    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4641   -1.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5980   -2.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4641   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3301   -2.0000    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  0  0  0  0\n  3  1  1  0  0  0  0\n  4  1  2  0  0  0  0\n  5  2  2  0  0  0  0\n  6  2  1  0  0  0  0\n  7  9  1  0  0  0  0\n  8  5  1  0  0  0  0\n  9  6  2  0  0  0  0\n 10  7  1  0  0  0  0\n  8  7  2  0  0  0  0\nM  CHG  2   1   1   3  -1\nM  END\n\n\n',
          ocl: {
            value: 'deVDaNFPbNf^RYWZf`@f@@',
            coordinates: '!Bb@JH_x@b@JH@ox@b@JH_x@',
            index: [
              -1727623160,
              33619968,
              268435584,
              1090519296,
              -2145386496,
              128,
              262144,
              134219776,
              34816,
              16,
              536870912,
              0,
              -2145386494,
              270336,
              0,
              49152
            ]
          }
        },
        identifier: { cas: [{ value: '100-00-5' }] },
        physical: {},
        spectra: {},
        misc: { externalID: 11189 }
      },
      $lastModification: 'sample@cheminfo.org',
      $modificationDate: 1479736117430,
      $creationDate: 1479736117417
    }
  },
  {
    id: 'aaa5f97c7cde94741de2938b106033e9',
    key: ['anonymousRead', '100-01-6 '],
    value: {
      mf: 'C6H6N2O2',
      mw: 138.124276,
      ocl: {
        value: 'deUDAHdDbTyInU~Eh@H@@',
        coordinates: '!BmpK~@K_}g~w@k_}mvw@k_}'
      },
      hasNmr: 1,
      has1d: true,
      has2d: false,
      nb1d: 1,
      nb2d: 0,
      nb1h: 1,
      nb13c: 0,
      modificationDate: 1479735996993,
      b64ShortId: 'qqX5fHze',
      names: [],
      reference: '100-01-6 '
    },
    doc: {
      _id: 'aaa5f97c7cde94741de2938b106033e9',
      _rev: '4-2692031b02dc370280e025550a9f1b3a',
      $type: 'entry',
      $id: ['100-01-6', null],
      $kind: 'sample',
      $owners: ['sample@cheminfo.org', 'anonymousRead', 'sampleRW'],
      $content: {
        general: {
          mf: 'C6H6N2O2',
          mw: 138.124276,
          em: 138.0429274413,
          molfile:
            '[N+](C1(=CC=C(C=C1)N))([O-])=O\n\n\n 10 10  0  0  0  0  0  0  0  0999 V2000\n    0.8660    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7320   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    1.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.5000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7320   -1.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5980    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4641   -1.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3301   -2.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5980   -2.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4641   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  0  0  0  0\n  3  1  1  0  0  0  0\n  4  1  2  0  0  0  0\n  5  2  2  0  0  0  0\n  6  2  1  0  0  0  0\n  7 10  1  0  0  0  0\n  8  7  1  0  0  0  0\n  9  5  1  0  0  0  0\n 10  6  2  0  0  0  0\n  9  7  2  0  0  0  0\nM  CHG  2   1   1   3  -1\nM  END\n\n\n',
          ocl: {
            value: 'deUDAHdDbTyInU~Eh@H@@',
            coordinates: '!BmpK~@K_}g~w@k_}mvw@k_}',
            index: [
              -1727623160,
              33619968,
              268435584,
              1090519296,
              -2145386496,
              0,
              262144,
              134219776,
              34816,
              16,
              536870912,
              0,
              -2147483646,
              270336,
              0,
              1097856
            ]
          }
        },
        identifier: { cas: [{ value: '100-01-6' }] },
        physical: {},
        spectra: {
          nmr: [
            {
              dimension: 1,
              nucleus: ['1H'],
              isFid: false,
              isFt: true,
              title: '100-01-6 -',
              solvent: 'DMSO',
              pulse: 'zg',
              experiment: '1d',
              temperature: 303,
              frequency: 400.112,
              type: 'NMR SPECTRUM',
              date: '2005-07-22T13:51:21.000Z',
              range: [
                {
                  from: 7.925075428263423,
                  to: 7.9712095560897875,
                  integral: 1.1803709652007108,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'd',
                      kind: '',
                      remark: '',
                      j: [{ coupling: 9.14573617231872, multiplicity: 'd' }],
                      delta: 7.948142492176605
                    }
                  ]
                },
                {
                  from: 6.6488831978413385,
                  to: 6.768438085903182,
                  integral: 1.6903359706094447,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 6.70866064187226
                    }
                  ]
                },
                {
                  from: 6.580802139235297,
                  to: 6.626053451609552,
                  integral: 1.267911793822532,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'd',
                      kind: '',
                      remark: '',
                      j: [{ coupling: 9.145347760749246, multiplicity: 'd' }],
                      delta: 6.603427795422425
                    }
                  ]
                },
                {
                  from: 3.3125856727096537,
                  to: 3.3363635451182603,
                  integral: 1.0013463280921708,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 3.324474608913957
                    }
                  ]
                },
                {
                  from: 2.489087934378054,
                  to: 2.5277430420811444,
                  integral: 1.0025443999114776,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 't',
                      kind: '',
                      remark: '',
                      j: [{ coupling: 1.9478935420684138, multiplicity: 't' }],
                      delta: 2.5084154882295993
                    }
                  ]
                }
              ],
              jcamp: { filename: 'spectra/nmr/1703.jdx' }
            }
          ]
        },
        misc: { externalID: 7423 }
      },
      $lastModification: 'sample@cheminfo.org',
      $modificationDate: 1479735996993,
      $creationDate: 1479735996950,
      _attachments: {
        'spectra/nmr/1703.jdx': {
          content_type: 'chemical/x-jcamp-dx',
          revpos: 1,
          digest: 'md5-PyNJXMsVU3DxAbk3pSbxYA==',
          length: 233390,
          stub: true
        }
      }
    }
  },
  {
    id: 'aaa5f97c7cde94741de2938b1059caef',
    key: ['anonymousRead', '100-02-7 '],
    value: {
      mf: 'C6H5NO3',
      mw: 139.109037,
      ocl: {
        value: 'deVLAHAIbTyInU~Eh@H@@',
        coordinates: '!BmpK~@K_}g~w@k_}mvw@k_}'
      },
      hasNmr: 1,
      has1d: true,
      has2d: false,
      nb1d: 1,
      nb2d: 0,
      nb1h: 1,
      nb13c: 0,
      modificationDate: 1479735869757,
      b64ShortId: 'qqX5fHze',
      names: [],
      reference: '100-02-7 '
    },
    doc: {
      _id: 'aaa5f97c7cde94741de2938b1059caef',
      _rev: '4-197da9d1e9adee3a092733ce5e4d0f29',
      $type: 'entry',
      $id: ['100-02-7', null],
      $kind: 'sample',
      $owners: ['sample@cheminfo.org', 'anonymousRead', 'sampleRW'],
      $content: {
        general: {
          mf: 'C6H5NO3',
          mw: 139.109037,
          em: 139.0269430239,
          molfile:
            '[N+](C1(=CC=C(C=C1)O))([O-])=O\n\n\n 10 10  0  0  0  0  0  0  0  0999 V2000\n    0.8660    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7320   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    1.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.5000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7320   -1.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5980    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4641   -1.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4641   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5980   -2.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3301   -2.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  0  0  0  0\n  3  1  1  0  0  0  0\n  4  1  2  0  0  0  0\n  5  2  2  0  0  0  0\n  6  2  1  0  0  0  0\n  7  8  1  0  0  0  0\n  8  6  2  0  0  0  0\n  9  5  1  0  0  0  0\n 10  7  1  0  0  0  0\n  7  9  2  0  0  0  0\nM  CHG  2   1   1   3  -1\nM  END\n\n\n',
          ocl: {
            value: 'deVLAHAIbTyInU~Eh@H@@',
            coordinates: '!BmpK~@K_}g~w@k_}mvw@k_}',
            index: [
              -1727098872,
              33619968,
              268435584,
              1090519296,
              -2145386496,
              2,
              262144,
              134219776,
              34816,
              16,
              536870912,
              0,
              -2147483646,
              270336,
              0,
              49156
            ]
          }
        },
        identifier: { cas: [{ value: '100-02-7' }] },
        physical: {},
        spectra: {
          nmr: [
            {
              dimension: 1,
              nucleus: ['1H'],
              isFid: false,
              isFt: true,
              title: '100-02-7 -',
              solvent: 'DMSO',
              pulse: 'zg',
              experiment: '1d',
              temperature: 303,
              frequency: 400.112,
              type: 'NMR SPECTRUM',
              date: '2005-07-22T13:18:59.000Z',
              range: [
                {
                  from: 8.09182787730648,
                  to: 8.146545553040456,
                  integral: 2.140007906679937,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'm',
                      kind: '',
                      remark: '',
                      delta: 8.119518560284074
                    }
                  ]
                },
                {
                  from: 6.908639282011339,
                  to: 6.96208339428533,
                  integral: 1.7537512837482465,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'd',
                      kind: '',
                      remark: '',
                      j: [{ coupling: 9.16258298007142, multiplicity: 'd' }],
                      delta: 6.9353613381483346
                    }
                  ]
                },
                {
                  from: 2.4892307009014587,
                  to: 2.527983161982269,
                  integral: 0.6254770700124811,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'quint',
                      kind: '',
                      remark: '',
                      j: [
                        { coupling: 1.8420766330739298, multiplicity: 'quint' }
                      ],
                      delta: 2.508606931441864
                    }
                  ]
                }
              ],
              jcamp: { filename: 'spectra/nmr/1698.jdx' }
            }
          ]
        },
        misc: { externalID: 233 }
      },
      $lastModification: 'sample@cheminfo.org',
      $modificationDate: 1479735869757,
      $creationDate: 1479735869715,
      _attachments: {
        'spectra/nmr/1698.jdx': {
          content_type: 'chemical/x-jcamp-dx',
          revpos: 1,
          digest: 'md5-r64EzkdtcsdWUXM+pEv7aA==',
          length: 217458,
          stub: true
        }
      }
    }
  },
  {
    id: 'aaa5f97c7cde94741de2938b105ccefa',
    key: ['anonymousRead', '100-10-7 '],
    value: {
      mf: 'C9H11NO',
      mw: 149.19008,
      ocl: {
        value: 'dmvH@AAIYWYnX@J`@@',
        coordinates: '!B`BH@ox@bOvH@h`BbOvH@ox@bOt'
      },
      hasNmr: 2,
      has1d: true,
      has2d: false,
      nb1d: 2,
      nb2d: 0,
      nb1h: 2,
      nb13c: 0,
      modificationDate: 1479735932501,
      b64ShortId: 'qqX5fHze',
      names: [],
      reference: '100-10-7 '
    },
    doc: {
      _id: 'aaa5f97c7cde94741de2938b105ccefa',
      _rev: '4-9fdc5d031533544b0c811b2e5e3a4069',
      $type: 'entry',
      $id: ['100-10-7', null],
      $kind: 'sample',
      $owners: ['sample@cheminfo.org', 'anonymousRead', 'sampleRW'],
      $content: {
        general: {
          mf: 'C9H11NO',
          mw: 149.19008,
          em: 149.0840639772,
          molfile:
            'C1(N(C)C)(=CC=C(C=O)C=C1)\n\n\n 11 11  0  0  0  0  0  0  0  0999 V2000\n    1.7320   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7320   -1.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5980    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3301   -2.9999    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3301   -1.9999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4641   -1.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4641   -0.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5980   -1.9999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    1.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  0  0  0  0\n  3  1  2  0  0  0  0\n  4  1  1  0  0  0  0\n  5  6  2  0  0  0  0\n  6  7  1  0  0  0  0\n  7  8  1  0  0  0  0\n  8  4  2  0  0  0  0\n  9  3  1  0  0  0  0\n 10  2  1  0  0  0  0\n 11  2  1  0  0  0  0\n  9  7  2  0  0  0  0\nM  END\n\n\n',
          ocl: {
            value: 'dmvH@AAIYWYnX@J`@@',
            coordinates: '!B`BH@ox@bOvH@h`BbOvH@ox@bOt',
            index: [
              1495699480,
              37822464,
              1610612865,
              1073742080,
              -2147483584,
              64,
              262144,
              134219776,
              0,
              262144,
              536870912,
              16384,
              536870914,
              262144,
              266240,
              131088
            ]
          }
        },
        identifier: { cas: [{ value: '100-10-7' }] },
        physical: {},
        spectra: {
          nmr: [
            {
              dimension: 1,
              nucleus: ['1H'],
              isFid: false,
              isFt: true,
              title: '100-10-7 -',
              solvent: 'CDCl3',
              pulse: 'zg',
              experiment: '1d',
              temperature: 303,
              frequency: 400.1124,
              type: 'NMR SPECTRUM',
              date: '2004-03-23T10:01:45.000Z',
              range: [
                {
                  from: 9.769392367026766,
                  to: 9.796469470373657,
                  integral: 0.8731852053737583,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 9.782930918700211
                    }
                  ]
                },
                {
                  from: 7.741809027532452,
                  to: 7.797054304924852,
                  integral: 1.847664940050913,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'm',
                      kind: '',
                      remark: '',
                      delta: 7.772775377839563
                    }
                  ]
                },
                {
                  from: 6.767393447403711,
                  to: 6.884634753409944,
                  integral: 0.802209226321971,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 6.8260141004068275
                    }
                  ]
                },
                {
                  from: 6.801656458075897,
                  to: 6.849142989319068,
                  integral: 1.1771870935647155,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'd',
                      kind: '',
                      remark: '',
                      j: [{ coupling: 8.875409002735068, multiplicity: 'd' }],
                      delta: 6.825399723697482
                    }
                  ]
                },
                {
                  from: 3.094013142425077,
                  to: 3.1154652805010374,
                  integral: 5.836783849052802,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 3.104739211463057
                    }
                  ]
                }
              ],
              jcamp: { filename: 'spectra/nmr/307.jdx' }
            },
            {
              dimension: 1,
              nucleus: ['1H'],
              isFid: false,
              isFt: true,
              title: '100-10-7 -',
              solvent: 'CDCl3',
              pulse: 'zg',
              experiment: '1d',
              temperature: 303,
              frequency: 400.112,
              type: 'NMR SPECTRUM',
              date: '2005-07-21T13:22:17.000Z',
              range: [
                {
                  from: 9.754050876317178,
                  to: 9.77946655727318,
                  integral: 0.8928545512785642,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 9.766758716795179
                    }
                  ]
                },
                {
                  from: 7.73686174612524,
                  to: 7.7842565143226965,
                  integral: 1.5448264296201073,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'd',
                      kind: '',
                      remark: '',
                      j: [{ coupling: 8.876692948801065, multiplicity: 'd' }],
                      delta: 7.760559130223968
                    }
                  ]
                },
                {
                  from: 6.6775260922678,
                  to: 6.7801419744427145,
                  integral: 0.7534686170860077,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 6.728834033355257
                    }
                  ]
                },
                {
                  from: 6.70399388120281,
                  to: 6.751723405643205,
                  integral: 1.4964074175889255,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'd',
                      kind: '',
                      remark: '',
                      j: [{ coupling: 8.892920591873008, multiplicity: 'd' }],
                      delta: 6.727858643423008
                    }
                  ]
                },
                {
                  from: 3.0975935174779488,
                  to: 3.119060192778719,
                  integral: 6.563577441300476,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 3.108326855128334
                    }
                  ]
                }
              ],
              jcamp: { filename: 'spectra/nmr/1637.jdx' }
            }
          ]
        },
        misc: { externalID: 1029 }
      },
      $lastModification: 'sample@cheminfo.org',
      $modificationDate: 1479735932501,
      $creationDate: 1479735932442,
      _attachments: {
        'spectra/nmr/307.jdx': {
          content_type: 'chemical/x-jcamp-dx',
          revpos: 1,
          digest: 'md5-dciv11LWPpEuE/SfMMLrBw==',
          length: 174716,
          stub: true
        },
        'spectra/nmr/1637.jdx': {
          content_type: 'chemical/x-jcamp-dx',
          revpos: 1,
          digest: 'md5-U1Pa2RTwjMrNDStS3FlmJg==',
          length: 181378,
          stub: true
        }
      }
    }
  },
  {
    id: 'aaa5f97c7cde94741de2938b1065b031',
    key: ['anonymousRead', '100-21-0 '],
    value: {
      mf: 'C8H6O4',
      mw: 166.131151,
      ocl: {
        value: 'dcLB@@Q]R[e]nEh@I`@@',
        coordinates: '!Bg~H_[]}g~w@k]}mwvw@k]}g~w@`'
      },
      hasNmr: 1,
      has1d: true,
      has2d: false,
      nb1d: 1,
      nb2d: 0,
      nb1h: 1,
      nb13c: 0,
      modificationDate: 1479736110168,
      b64ShortId: 'qqX5fHze',
      names: [],
      reference: '100-21-0 '
    },
    doc: {
      _id: 'aaa5f97c7cde94741de2938b1065b031',
      _rev: '4-7590e188678b9b11beb93fac20ad102b',
      $type: 'entry',
      $id: ['100-21-0', null],
      $kind: 'sample',
      $owners: ['sample@cheminfo.org', 'anonymousRead', 'sampleRW'],
      $content: {
        general: {
          mf: 'C8H6O4',
          mw: 166.131151,
          em: 166.0266086707,
          molfile:
            'C(C=1(C=CC(C(=O)O)=CC=1))(=O)O\n\n\n 12 12  0  0  0  0  0  0  0  0999 V2000\n    4.3301   -1.9999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7320   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4641   -1.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3301   -3.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    1.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7320   -1.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5980   -1.9999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5980    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4641   -0.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.5000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    5.1961   -1.4999    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  2  3  1  0  0  0  0\n  3  9  2  0  0  0  0\n  4  1  1  0  0  0  0\n  5  1  2  0  0  0  0\n  6  2  2  0  0  0  0\n  7  8  2  0  0  0  0\n  8  4  1  0  0  0  0\n  9 10  1  0  0  0  0\n 10  4  2  0  0  0  0\n 11  2  1  0  0  0  0\n 12  1  1  0  0  0  0\n  7  3  1  0  0  0  0\nM  END\n\n\n',
          ocl: {
            value: 'dcLB@@Q]R[e]nEh@I`@@',
            coordinates: '!Bg~H_[]}g~w@k]}mwvw@k]}g~w@`',
            index: [
              -787606512,
              1073750016,
              268439552,
              1090519296,
              -2147483648,
              64,
              262144,
              0,
              2048,
              16,
              536870912,
              1073741840,
              -1610612736,
              4096,
              0,
              98316
            ]
          }
        },
        identifier: { cas: [{ value: '100-21-0' }] },
        physical: {},
        spectra: {
          nmr: [
            {
              dimension: 1,
              nucleus: ['1H'],
              isFid: false,
              isFt: true,
              title: '100-21-0 -',
              solvent: 'DMSO',
              pulse: 'zg',
              experiment: '1d',
              temperature: 303,
              frequency: 400.112,
              type: 'NMR SPECTRUM',
              date: '2005-08-05T08:59:06.000Z',
              range: [
                {
                  from: 8.035710898701957,
                  to: 8.056189117205278,
                  integral: 4.889134971330801,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 8.045950007953618
                    }
                  ]
                },
                {
                  from: 2.488430553436121,
                  to: 2.5271466826619244,
                  integral: 1.1108650286691995,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'quint',
                      kind: '',
                      remark: '',
                      j: [
                        { coupling: 1.8610630346659036, multiplicity: 'quint' }
                      ],
                      delta: 2.5077886180490228
                    }
                  ]
                }
              ],
              jcamp: { filename: 'spectra/nmr/1973.jdx' }
            }
          ]
        },
        misc: { externalID: 7716 }
      },
      $lastModification: 'sample@cheminfo.org',
      $modificationDate: 1479736110168,
      $creationDate: 1479736110130,
      _attachments: {
        'spectra/nmr/1973.jdx': {
          content_type: 'chemical/x-jcamp-dx',
          revpos: 1,
          digest: 'md5-DBqUhw3pu0Olc61BIcU4vw==',
          length: 186917,
          stub: true
        }
      }
    }
  },
  {
    id: 'aaa5f97c7cde94741de2938b10593835',
    key: ['anonymousRead', '100-39-0 '],
    value: {
      mf: 'C7H7Br',
      mw: 171.034265,
      ocl: { value: 'daD@`@qDeeVz`@@@', coordinates: '!BbOrH_ybOrHXa}bOp' },
      hasNmr: 2,
      has1d: true,
      has2d: false,
      nb1d: 2,
      nb2d: 0,
      nb1h: 2,
      nb13c: 0,
      modificationDate: 1479735855170,
      b64ShortId: 'qqX5fHze',
      names: [],
      reference: '100-39-0 '
    },
    doc: {
      _id: 'aaa5f97c7cde94741de2938b10593835',
      _rev: '4-c22b948424ba2d6be9d57ad7bc9ffd23',
      $type: 'entry',
      $id: ['100-39-0', null],
      $kind: 'sample',
      $owners: ['sample@cheminfo.org', 'anonymousRead', 'sampleRW'],
      $content: {
        general: {
          mf: 'C7H7Br',
          mw: 171.034265,
          em: 169.9731123465,
          molfile:
            '[Br]CC1(=CC=CC=C1)\n\n\n  8  8  0  0  0  0  0  0  0  0999 V2000\n    1.7320   -0.5000    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660   -1.9999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7320   -0.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7320   -1.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  2  3  1  0  0  0  0\n  3  1  1  0  0  0  0\n  4  2  2  0  0  0  0\n  5  2  1  0  0  0  0\n  6  5  2  0  0  0  0\n  7  4  1  0  0  0  0\n  8  6  1  0  0  0  0\n  8  7  2  0  0  0  0\nM  END\n\n\n',
          ocl: {
            value: 'daD@`@qDeeVz`@@@',
            coordinates: '!BbOrH_ybOrHXa}bOp',
            index: [
              -1056698368,
              8192,
              268435456,
              16777216,
              -2147483648,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1024
            ]
          }
        },
        identifier: { cas: [{ value: '100-39-0' }] },
        physical: {},
        spectra: {
          nmr: [
            {
              dimension: 1,
              nucleus: ['1H'],
              isFid: false,
              isFt: true,
              title: '"100-39-0',
              pulse: '<zg>',
              experiment: '1d',
              temperature: 203,
              frequency: 400.13655332242,
              type: 'NMR Spectrum',
              date: '2003-01-29T15:35:10.000Z',
              range: [
                {
                  from: 7.260235462951535,
                  to: 7.4411714346326985,
                  integral: 4.873387700852564,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'm',
                      kind: '',
                      remark: '',
                      delta: 7.385123192614351
                    }
                  ]
                },
                {
                  from: 4.508017156767125,
                  to: 4.532334667401451,
                  integral: 2.0980028325543505,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 4.520175912084288
                    }
                  ]
                }
              ],
              jcamp: { filename: 'spectra/nmr/33.jdx' }
            },
            {
              dimension: 1,
              nucleus: ['1H'],
              isFid: false,
              isFt: true,
              title: '100-39-0 -',
              solvent: 'CDCl3',
              pulse: 'zg',
              experiment: '1d',
              temperature: 303,
              frequency: 400.1124,
              type: 'NMR SPECTRUM',
              date: '2004-03-16T14:43:14.000Z',
              range: [
                {
                  from: 7.241969966157869,
                  to: 7.457251243438502,
                  integral: 4.321855237060754,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'm',
                      kind: '',
                      remark: '',
                      delta: 7.384404634862011
                    }
                  ]
                },
                {
                  from: 4.491782727359135,
                  to: 4.545867178854742,
                  integral: 1.9373997118885506,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 4.518824953106939
                    }
                  ]
                },
                {
                  from: 0.06801496179693399,
                  to: 0.12291518109351511,
                  integral: 0.7407450510506942,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 0.09546507144522455
                    }
                  ]
                }
              ],
              jcamp: { filename: 'spectra/nmr/283.jdx' }
            }
          ]
        },
        misc: { externalID: 149 }
      },
      $lastModification: 'sample@cheminfo.org',
      $modificationDate: 1479735855170,
      $creationDate: 1479735855103,
      _attachments: {
        'spectra/nmr/33.jdx': {
          content_type: 'chemical/x-jcamp-dx',
          revpos: 1,
          digest: 'md5-Gt4J6u+qHfy7IXLWHUIulQ==',
          length: 195719,
          stub: true
        },
        'spectra/nmr/283.jdx': {
          content_type: 'chemical/x-jcamp-dx',
          revpos: 1,
          digest: 'md5-Xroc9FHX+ADLj4DR7ETMrQ==',
          length: 193800,
          stub: true
        }
      }
    }
  },
  {
    id: 'aaa5f97c7cde94741de2938b10590612',
    key: ['anonymousRead', '100-41-4 '],
    value: {
      mf: 'C8H10',
      mw: 106.165295,
      ocl: { value: 'daD@@DjUZxHH@@', coordinates: '!Bg~w@h`BmvwXc}mpH' },
      hasNmr: 1,
      has1d: true,
      has2d: false,
      nb1d: 1,
      nb2d: 0,
      nb1h: 1,
      nb13c: 0,
      modificationDate: 1479735851920,
      b64ShortId: 'qqX5fHze',
      names: [],
      reference: '100-41-4 '
    },
    doc: {
      _id: 'aaa5f97c7cde94741de2938b10590612',
      _rev: '4-18a2c0a71b7a067bbd779d8f96ff0a5d',
      $type: 'entry',
      $id: ['100-41-4', null],
      $kind: 'sample',
      $owners: ['sample@cheminfo.org', 'anonymousRead', 'sampleRW'],
      $content: {
        general: {
          mf: 'C8H10',
          mw: 106.165295,
          em: 106.0782503207,
          molfile:
            'C=1(CC)(C=CC=CC=1)\n\n\n  8  8  0  0  0  0  0  0  0  0999 V2000\n    1.7320   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7320   -1.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5980    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5980   -2.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4641   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4641   -1.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  0  0  0  0\n  3  1  1  0  0  0  0\n  4  1  2  0  0  0  0\n  5  2  1  0  0  0  0\n  6  3  2  0  0  0  0\n  7  4  1  0  0  0  0\n  8  7  2  0  0  0  0\n  8  6  1  0  0  0  0\nM  END\n\n\n',
          ocl: {
            value: 'daD@@DjUZxHH@@',
            coordinates: '!Bg~w@h`BmvwXc}mpH',
            index: [
              1099173888,
              8192,
              0,
              128,
              -2147483648,
              0,
              0,
              4,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          }
        },
        identifier: { cas: [{ value: '100-41-4' }] },
        physical: {},
        spectra: {
          nmr: [
            {
              dimension: 1,
              nucleus: ['1H'],
              isFid: false,
              isFt: true,
              title: '"100-41-4',
              pulse: '<zg>',
              experiment: '1d',
              temperature: 303,
              frequency: 400.112,
              type: 'NMR Spectrum',
              date: '2003-01-27T11:01:52.000Z',
              range: [
                {
                  from: 7.3136730438439255,
                  to: 7.35942994437295,
                  integral: 1.5266632950226098,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'd',
                      kind: '',
                      remark: '',
                      j: [{ coupling: 7.416299846142465, multiplicity: 'd' }],
                      delta: 7.336551494108438
                    }
                  ]
                },
                {
                  from: 7.199530388255718,
                  to: 7.2903219090261375,
                  integral: 2.829213000069524,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'm',
                      kind: '',
                      remark: '',
                      delta: 7.261466222825223
                    }
                  ]
                },
                {
                  from: 2.677181125012322,
                  to: 2.7589641689450493,
                  integral: 2.012616277728697,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'q',
                      kind: '',
                      remark: '',
                      j: [{ coupling: 7.617642812717804, multiplicity: 'q' }],
                      delta: 2.7180726469786856
                    }
                  ]
                },
                {
                  from: 1.2817858408850147,
                  to: 1.3360342573391852,
                  integral: 3.242497361679286,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 't',
                      kind: '',
                      remark: '',
                      j: [{ coupling: 7.601584960314199, multiplicity: 't' }],
                      delta: 1.3089100491121
                    }
                  ]
                }
              ],
              jcamp: { filename: 'spectra/nmr/28.jdx' }
            }
          ]
        },
        misc: { externalID: 144 }
      },
      $lastModification: 'sample@cheminfo.org',
      $modificationDate: 1479735851920,
      $creationDate: 1479735851880,
      _attachments: {
        'spectra/nmr/28.jdx': {
          content_type: 'chemical/x-jcamp-dx',
          revpos: 1,
          digest: 'md5-nz+gJ34/9iBjISIXQ2WyhQ==',
          length: 187655,
          stub: true
        }
      }
    }
  },
  {
    id: 'aaa5f97c7cde94741de2938b1059d5bc',
    key: ['anonymousRead', '100-42-5 '],
    value: {
      mf: 'C8H8',
      mw: 104.149413,
      ocl: { value: 'daD@@DjUZxHD@@', coordinates: '!Bg~HK_|bOvH_[_}bOp' },
      nb1d: 0,
      nb2d: 0,
      nb1h: 0,
      nb13c: 0,
      modificationDate: 1479735870307,
      b64ShortId: 'qqX5fHze',
      names: [],
      reference: '100-42-5 '
    },
    doc: {
      _id: 'aaa5f97c7cde94741de2938b1059d5bc',
      _rev: '4-29c7a1b774b6ac92bcfd26f7b4e6c6c4',
      $type: 'entry',
      $id: ['100-42-5', null],
      $kind: 'sample',
      $owners: ['sample@cheminfo.org', 'anonymousRead', 'sampleRW'],
      $content: {
        general: {
          mf: 'C8H8',
          mw: 104.149413,
          em: 104.0626002566,
          molfile:
            'C(=C)C1(=CC=CC=C1)\n\n\n  8  8  0  0  0  0  0  0  0  0999 V2000\n    0.8660    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7320   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660   -1.9999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7320   -0.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7320   -1.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  2  0  0  0  0\n  3  1  1  0  0  0  0\n  4  3  2  0  0  0  0\n  5  3  1  0  0  0  0\n  6  5  2  0  0  0  0\n  7  4  1  0  0  0  0\n  8  6  1  0  0  0  0\n  8  7  2  0  0  0  0\nM  END\n\n\n',
          ocl: {
            value: 'daD@@DjUZxHD@@',
            coordinates: '!Bg~HK_|bOvH_[_}bOp',
            index: [
              1090523136,
              8192,
              0,
              256,
              -2147483648,
              0,
              262144,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          }
        },
        identifier: { cas: [{ value: '100-42-5' }] },
        physical: {},
        spectra: {},
        misc: { externalID: 264 }
      },
      $lastModification: 'sample@cheminfo.org',
      $modificationDate: 1479735870307,
      $creationDate: 1479735870295
    }
  },
  {
    id: 'aaa5f97c7cde94741de2938b105e5682',
    key: ['anonymousRead', '100-46-9 '],
    value: {
      mf: 'C7H9N',
      mw: 107.153321,
      ocl: { value: 'daF@@@RVU[j@@@@', coordinates: '!BbOrH_ybOrHXa}bOp' },
      hasNmr: 1,
      has1d: true,
      has2d: false,
      nb1d: 1,
      nb2d: 0,
      nb1h: 1,
      nb13c: 0,
      modificationDate: 1479735965108,
      b64ShortId: 'qqX5fHze',
      names: [],
      reference: '100-46-9 '
    },
    doc: {
      _id: 'aaa5f97c7cde94741de2938b105e5682',
      _rev: '4-73cdd22169365b5bffe296831fd17946',
      $type: 'entry',
      $id: ['100-46-9', null],
      $kind: 'sample',
      $owners: ['sample@cheminfo.org', 'anonymousRead', 'sampleRW'],
      $content: {
        general: {
          mf: 'C7H9N',
          mw: 107.153321,
          em: 107.0734992935,
          molfile:
            'NCC1(=CC=CC=C1)\n\n\n  8  8  0  0  0  0  0  0  0  0999 V2000\n    1.7320   -0.5000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660   -1.9999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7320   -0.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7320   -1.4999    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  2  3  1  0  0  0  0\n  3  1  1  0  0  0  0\n  4  2  2  0  0  0  0\n  5  2  1  0  0  0  0\n  6  5  2  0  0  0  0\n  7  4  1  0  0  0  0\n  8  6  1  0  0  0  0\n  7  8  2  0  0  0  0\nM  END\n\n\n',
          ocl: {
            value: 'daF@@@RVU[j@@@@',
            coordinates: '!BbOrH_ybOrHXa}bOp',
            index: [
              -1056665600,
              268443648,
              268435456,
              16777216,
              -2147483648,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1048704
            ]
          }
        },
        identifier: { cas: [{ value: '100-46-9' }] },
        physical: {},
        spectra: {
          nmr: [
            {
              dimension: 1,
              nucleus: ['1H'],
              isFid: false,
              isFt: true,
              title: '100-46-9 -',
              solvent: 'CDCl3',
              pulse: 'zg',
              experiment: '1d',
              temperature: 303,
              frequency: 400.112,
              type: 'NMR SPECTRUM',
              date: '2005-07-20T13:32:38.000Z',
              range: [
                {
                  from: 7.2165425385410416,
                  to: 7.386059811809865,
                  integral: 4.728837136948755,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'm',
                      kind: '',
                      remark: '',
                      delta: 7.332282453577131
                    }
                  ]
                },
                {
                  from: 3.835711482966662,
                  to: 3.8682445446433835,
                  integral: 2.173307795111299,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 3.851978013805023
                    }
                  ]
                },
                {
                  from: 1.3724408812384348,
                  to: 1.4727473898844372,
                  integral: 2.0978550679399453,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 1.422594135561436
                    }
                  ]
                }
              ],
              jcamp: { filename: 'spectra/nmr/1497.jdx' }
            }
          ]
        },
        misc: { externalID: 7234 }
      },
      $lastModification: 'sample@cheminfo.org',
      $modificationDate: 1479735965108,
      $creationDate: 1479735965069,
      _attachments: {
        'spectra/nmr/1497.jdx': {
          content_type: 'chemical/x-jcamp-dx',
          revpos: 1,
          digest: 'md5-HrF9KwlW2a7yujR7swGqVQ==',
          length: 178814,
          stub: true
        }
      }
    }
  },
  {
    id: 'aaa5f97c7cde94741de2938b105bebdc',
    key: ['anonymousRead', '100-61-8 '],
    value: {
      mf: 'C7H9N',
      mw: 107.153321,
      ocl: { value: 'daF@@@Rfu[j@@@@', coordinates: '!BmvH[\\Bg~w[_}g|' },
      keyword: [],
      hasNmr: 1,
      hasIR: 1,
      hasMass: 0,
      has1d: true,
      has2d: false,
      nb1d: 1,
      nb2d: 0,
      nb1h: 1,
      nb13c: 0,
      modificationDate: 1510262471670,
      b64ShortId: 'qqX5fHze',
      names: [],
      reference: '100-61-8 '
    },
    doc: {
      _id: 'aaa5f97c7cde94741de2938b105bebdc',
      _rev: '6-1fdf84232b6c4c1812478f90573e2d1d',
      $type: 'entry',
      $id: ['100-61-8', null],
      $kind: 'sample',
      $owners: ['sample@cheminfo.org', 'anonymousRead', 'sampleRW'],
      $content: {
        general: {
          mf: 'C7H9N',
          mw: 107.153321,
          em: 107.0734992935,
          molfile:
            'N(C1(=CC=CC=C1))C\n\n\n  8  8  0  0  0  0  0  0  0  0999 V2000\n    0.8660    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7320   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7320   -1.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5980    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4641   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5980   -2.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4641   -1.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  0  0  0  0\n  3  1  1  0  0  0  0\n  4  2  2  0  0  0  0\n  5  2  1  0  0  0  0\n  6  5  2  0  0  0  0\n  7  4  1  0  0  0  0\n  8  6  1  0  0  0  0\n  8  7  2  0  0  0  0\nM  END\n\n\n',
          ocl: {
            value: 'daF@@@Rfu[j@@@@',
            coordinates: '!BmvH[\\Bg~w[_}g|',
            index: [
              151425032,
              37814272,
              128,
              0,
              -2147483648,
              0,
              0,
              134217728,
              0,
              0,
              0,
              16384,
              0,
              262144,
              0,
              524352
            ]
          },
          description: '',
          title: '',
          name: [],
          keyword: [],
          sequence: '',
          kind: ''
        },
        identifier: { cas: [{ value: '100-61-8' }] },
        physical: {},
        spectra: {
          nmr: [
            {
              dimension: 1,
              nucleus: ['1H'],
              isFid: false,
              isFt: true,
              title: '100-61-8 -',
              solvent: 'CDCl3',
              pulse: 'zg',
              experiment: '1d',
              temperature: 296.3,
              frequency: 400.1321303162,
              type: 'NMR SPECTRUM',
              date: '2004-03-15T10:11:23.000Z',
              range: [
                {
                  from: 7.241328871419086,
                  to: 7.30153227384648,
                  integral: 1.7268915905388775,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 't',
                      kind: '',
                      remark: '',
                      j: [{ coupling: 7.886768257294534, multiplicity: 't' }],
                      delta: 7.271430572632783
                    }
                  ]
                },
                {
                  from: 6.755698138979067,
                  to: 6.831863014505465,
                  integral: 0.8899409427170921,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 't',
                      kind: '',
                      remark: '',
                      j: [{ coupling: 7.339686566027922, multiplicity: 't' }],
                      delta: 6.793780576742266
                    }
                  ]
                },
                {
                  from: 6.667640751911187,
                  to: 6.713568752185619,
                  integral: 1.7651061978292772,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'd',
                      kind: '',
                      remark: '',
                      j: [{ coupling: 8.100600767097603, multiplicity: 'd' }],
                      delta: 6.6906047520484035
                    }
                  ]
                },
                {
                  from: 3.6607108067032232,
                  to: 3.8682225501879994,
                  integral: 1.0309795404751116,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 'br s',
                      kind: '',
                      remark: '',
                      delta: 3.7644666784456113
                    }
                  ]
                },
                {
                  from: 2.8775273640447687,
                  to: 2.906590142864133,
                  integral: 3.1712746132789866,
                  signal: [
                    {
                      nbAtoms: 0,
                      diaID: [],
                      multiplicity: 's',
                      kind: '',
                      remark: '',
                      delta: 2.892058753454451
                    }
                  ]
                }
              ],
              jcamp: { filename: 'spectra/nmr/258.jdx' }
            }
          ],
          chromatogram: [],
          differentialScanningCalorimetry: [],
          ir: [{ jcamp: { filename: 'spectra/ir/ir.jdx' } }],
          mass: [],
          raman: [],
          thermogravimetricAnalysis: [],
          xray: []
        },
        misc: { externalID: 596 },
        image: []
      },
      $lastModification: 'admin@cheminfo.org',
      $modificationDate: 1510262471670,
      $creationDate: 1479735914540,
      _attachments: {
        'spectra/nmr/258.jdx': {
          content_type: 'chemical/x-jcamp-dx',
          revpos: 1,
          digest: 'md5-DxD4TzulqKPkrCmhfFCF3Q==',
          length: 182046,
          stub: true
        },
        'spectra/ir/ir.jdx': {
          content_type: 'chemical/x-jcamp-dx',
          revpos: 4,
          digest: 'md5-b01XCJdRAJr4qDMvsuWv9Q==',
          length: 8399,
          stub: true
        }
      }
    }
  }
];

export default data;
