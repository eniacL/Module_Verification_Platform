//----------------------------------------------------------------------
//   Copyright 2007-2013 Cadence Design Systems, Inc.
//   Copyright 2009-2010 Mentor Graphics Corporation
//   Copyright 2010-2011 Synopsys, Inc.
//   All Rights Reserved Worldwide
//
//   Licensed under the Apache License, Version 2.0 (the
//   "License"); you may not use this file except in
//   compliance with the License.  You may obtain a copy of
//   the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in
//   writing, software distributed under the License is
//   distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
//   CONDITIONS OF ANY KIND, either express or implied.  See
//   the License for the specific language governing
//   permissions and limitations under the License.
//----------------------------------------------------------------------

// hdl vendor backends are defined for VCS,QUESTA,INCA
#if defined(VCS) || defined(VCSMX)
	#include "uvm_hdl_vcs.c"
#else
	#ifdef QUESTA
		#include "uvm_hdl_questa.c"
	#else
		#if defined(INCA) || defined(NCSC)
			#include "uvm_hdl_inca.c"
		#else
			#if defined(DVT)
			#else
				#error "hdl vendor backend is missing"
			#endif
		#endif
	#endif
#endif

